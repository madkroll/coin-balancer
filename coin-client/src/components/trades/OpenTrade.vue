<template>
    <div>
        <form method="POST" action="" id="open-trade-form" name="open-trade-form">
            <label for="cg-cost"/>
            <input v-model="cgCost" id="cg-cost" name="cg-cost" type="number"/>

            <label for="fromCoin"/>
            <input v-model="fromCoin" id="fromCoin" name="fromCoin" type="text" placeholder="BTC"/>

            <label for="toCoin"/>
            <input v-model="toCoin" id="toCoin" name="toCoin" type="text" placeholder="XTZ"/>

            <label for="comment"/>
            <input id="comment" name="comment" type="text"
                   v-bind:value="fromCoin + ' to ' + toCoin + '(' + cgCost + ')'"/>

            <input type="button" value="Open" v-on:click="openTrade"/>
        </form>

        <div>
            <input type="button" value="Refresh" v-on:click="fetchOpenTrades"/>
            <div v-for="(trade, index) in trades" v-bind:key="trade.timestamp">
                <p v-text="trade.fromCoin + ' to ' + trade.toCoin + ' ( ' + trade.cgCost + ' )'"></p>
                <input type="button" v-on:click="removeTrade(index)" value="Remove"/>
            </div>
        </div>
    </div>
</template>

<script>
    const fetch = require("node-fetch");
    const url = "https://ioerjs2o02.execute-api.eu-west-1.amazonaws.com/dev/trades/open";

    const fetchUrl = "https://ia9c9sqyx1.execute-api.eu-west-1.amazonaws.com/dev/trades/open/fetch";

    const removeUrl = "https://45c8y05659.execute-api.eu-west-1.amazonaws.com/dev/trades/open/remove";

    export default {
        methods: {
            async openTrade() {
                const newTrade = {
                    timestamp: Date.now(),
                    cgCost: this.cgCost,
                    fromCoin: this.fromCoin,
                    toCoin: this.toCoin
                };

                fetch.default(url, {
                    method: 'POST',
                    body: JSON.stringify(newTrade),
                    headers: {'Content-Type': 'application/json'}
                }).catch(err => console.error(err));

                this.trades.push(newTrade);
            },

            async removeTrade(index) {
                fetch.default(removeUrl, {
                    method: 'POST',
                    body: JSON.stringify({timestamp: this.trades[index].timestamp}),
                    headers: {'Content-Type': 'application/json'}
                }).catch(err => console.error(err));

                this.trades.splice(index, 1);
            },

            async fetchOpenTrades() {
                const response =
                    await fetch.default(fetchUrl, {
                        method: 'GET'
                    }).catch(err => console.error(err));

                this.trades = await response.json();
            }
        },
        data: () => ({
            cgCost: 0.01,
            fromCoin: "BTC",
            toCoin: "XTZ",
            trades: []
        }),
        mounted() {
            this.fetchOpenTrades();
        }
    }
</script>