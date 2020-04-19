<template>
    <div class="container">
        <time-threshold
                :selected="timeThreshold.selected"
                :options="timeThreshold.options"
                @changed="handleThresholdChange($event)"/>

        <rates-chart
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"/>
    </div>
</template>

<script>
    import TimeThreshold from './TimeThreshold'
    import RatesChart from './Chart.vue'
    import Currencies from '../currencies'

    const fetch = require("node-fetch");
    const url = "https://kdloxw1m10.execute-api.eu-west-1.amazonaws.com/dev/rates/fetch";

    function toChartData(reports) {
        let labels = [];
        let datasets = {};
        let baseline = {};

        for (let report of reports) {
            labels.push("" + report.date);

            for (let price of report.prices) {
                const btcEquivalent = Number(price.prices.latest);

                if (!baseline[price.base]) {
                    baseline[price.base] = btcEquivalent;
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

                datasets[price.base].data.push(
                    price.base === "BTC" ? 100
                        : btcEquivalent * 100 / baseline[price.base]
                );
            }
        }

        return {labels: labels, datasets: Object.values(datasets)};
    }

    export default {
        name: 'RatesBoard',
        components: {
            RatesChart,
            TimeThreshold
        },
        methods: {
            async handleThresholdChange(event) {
                this.timeThreshold.selected = event.target.options[event.target.options.selectedIndex].value;
                await this.refreshRates();
            },
            async refreshRates() {
                try {
                    this.loaded = false;
                    const response = await fetch.default(url + "?ago=" + this.timeThreshold.selected, {
                        method: 'GET'
                    });
                    const reports = await response.json();
                    this.chartdata = toChartData(reports);
                    this.loaded = true
                } catch (e) {
                    console.error(e);
                }
            }
        },
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
            },
            timeThreshold: {
                selected: '3',
                options: [
                    {text: '3 hours', value: '3'},
                    {text: '10 hours', value: '10'},
                    {text: '24 hours', value: '24'}
                ]
            }
        }),
        async mounted() {
            await this.refreshRates();
        }
    }
</script>