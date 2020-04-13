<template>
    <div class="container">
        <line-chart
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"/>
    </div>
</template>

<script>
    import LineChart from './Chart.vue'
    import Currencies from '../currencies'

    const fetch = require("node-fetch");
    const url = "https://kdloxw1m10.execute-api.eu-west-1.amazonaws.com/dev/rates/fetch";
    // const url = "http://localhost:8080/dev/rates/fetch";

    function toChartData(reports) {
        let labels = [];
        let datasets = {};
        let baseline = {};

        datasets["EUR"] = {
            label: "EUR",
            data: [],
            backgroundColor: "transparent",
            borderColor: Currencies.COLORS["EUR"],
            pointBackgroundColor: Currencies.COLORS["EUR"]
        };

        for (let report of reports) {
            labels.push("" + report.date);

            for (let price of report.prices) {
                if (!baseline[price.base]) {
                    baseline[price.base] = price.btcEquivalent;
                }

                if (price.base === "BTC") {
                    if (!baseline["EUR"]) {
                        baseline["EUR"] = price.amount;
                    }

                    datasets["EUR"].data.push(price.amount * 100 / baseline["EUR"]);
                }

                if (!datasets[price.base]) {
                    datasets[price.base] = {
                        label: price.base,
                        data: [],
                        backgroundColor: "transparent",
                        borderColor: Currencies.COLORS[price.base],
                        pointBackgroundColor: Currencies.COLORS[price.base]
                    };
                }

                datasets[price.base].data.push(price.btcEquivalent * 100 / baseline[price.base]);
            }
        }

        return {labels: labels, datasets: Object.values(datasets)};
    }

    export default {
        name: 'LineChartContainer',
        components: {LineChart},
        data: () => ({
            loaded: false,
            chartdata: null,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Coin rates"
                }
            }
        }),
        async mounted() {
            this.loaded = false;
            try {
                const response = await fetch.default(url, {
                        method: 'GET'
                    });
                const reports = await response.json();
                this.chartdata = toChartData(reports);
                this.loaded = true
            } catch (e) {
                console.error(e);
            }
        }
    }
</script>