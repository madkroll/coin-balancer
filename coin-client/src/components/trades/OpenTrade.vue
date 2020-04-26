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
            <div v-for="(trade, index) in trades" v-bind:key="trade.id">
                <p v-text="trade.cgCost + ' ' + trade.fromCoin + ' ' + trade.toCoin"></p>
                <input type="button" v-on:click="trades.splice(index, 1)" value="Remove"/>
            </div>
        </div>
    </div>
</template>

<script>
    const fetch = require("node-fetch");
    const url = "https://ioerjs2o02.execute-api.eu-west-1.amazonaws.com/dev/trades/open";

    export default {
        methods: {
            async openTrade() {
                fetch.default(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        timestamp: Date.now(),
                        cgCost: this.cgCost,
                        fromCoin: this.fromCoin,
                        toCoin: this.toCoin
                    }),
                    headers: {'Content-Type': 'application/json'}
                }).catch(err => console.error(err));
            }
        },
        data: () => ({
            cgCost: 0.01,
            fromCoin: "BTC",
            toCoin: "XTZ",
            trades: [
                {
                    id: "123",
                    fromCoin: "BTC",
                    toCoin: "XTZ",
                    cgCost: 0.02
                },
                {
                    id: "333",
                    fromCoin: "BTC",
                    toCoin: "DASH",
                    cgCost: 0.02
                }
            ]
        })
    }
</script>