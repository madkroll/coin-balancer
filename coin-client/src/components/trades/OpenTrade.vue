<template>
    <div>
        <form method="POST" action="" id="open-trade-form" name="open-trade-form">
            <input type="button" value="Refresh" v-on:click="fetchOpenTrades"/>

            <div id="sold">
                <label for="sold-currency">From:</label>
                <input id="sold-currency" name="sold-currency" v-model="input.sold.currency" type="text"/>

                <label for="sold-amount">Amount:</label>
                <input id="sold-amount" name="sold-amount" v-model="input.sold.amount" type="text"/>

                <label for="sold-rate">EUR:</label>
                <input id="sold-rate" name="sold-rate" v-model="input.sold.rate" type="number"/>

                <label for="sold-cg-rate">BTC:</label>
                <input id="sold-cg-rate" name="sold-cg-rate" v-model="input.sold.cgRate" type="number"/>
            </div>

            <div id="bought">
                <label for="bought-currency">To:</label>
                <input id="bought-currency" name="bought-currency" v-model="input.bought.currency" type="text"/>

                <label for="bought-amount">Amount:</label>
                <input id="bought-amount" name="bought-amount" v-model="input.bought.amount" type="text"/>
            </div>

            <input type="button" value="Open" v-on:click="openTrade"/>
        </form>

        <div>
            <div v-for="(trade, index) in trades" v-bind:key="trade.timestamp">
                <table>
                    <caption v-text="trade.title"/>
                    <tr>
                        <th>Assets</th>
                        <th v-text="trade.datetime"/>
                        <th>Offers</th>
                    </tr>
                    <tr>
                        <td v-text="trade.sold.currency"/>
                        <td v-text="trade.sold.amount">
                        <td v-text="trade.bought.buyBackAmount">
                    </tr>
                    <tr>
                        <td>BTC</td>
                        <td v-text="trade.sold.cgRate">
                        <td v-text="trade.bought.currentRate">
                    </tr>
                    <tr>
                        <td>EUR</td>
                        <td v-text="trade.sold.rate">
                        <td v-text="trade.bought.currentCGRate">
                    </tr>
                </table>

                <input type="button" v-on:click="removeTrade(index)" value="Remove"/>
            </div>
        </div>
    </div>
</template>

<script>
    const fetch = require("node-fetch");
    const uuid = require("uuid");
    const url = "https://ioerjs2o02.execute-api.eu-west-1.amazonaws.com/dev/trades/open";

    const fetchUrl = "https://ia9c9sqyx1.execute-api.eu-west-1.amazonaws.com/dev/trades/open/fetch";

    const removeUrl = "https://45c8y05659.execute-api.eu-west-1.amazonaws.com/dev/trades/open/remove";

    export default {
        methods: {
            async openTrade() {
                const timestamp = Date.now();
                const newTrade = {
                    id: uuid.v4(),
                    timestamp: timestamp,
                    datetime: new Date(timestamp),
                    title: this.input.sold.amount + ' ' + this.input.sold.currency + ' to ' + this.input.bought.amount + ' ' + this.input.bought.currency,
                    sold : {
                        currency : this.input.sold.currency,
                        amount : this.input.sold.amount,
                        rate : this.input.sold.rate,
                        cgRate : this.input.sold.cgRate,
                        currentRate: 0.0,
                        currentCGRate: 0.0
                    },
                    bought : {
                        currency : this.input.bought.currency,
                        amount : this.input.bought.amount,
                        buyBackAmount : 0,
                        currentRate: 0.0,
                        currentCGRate: 0.0
                    }
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
            input: {
                sold: {
                    currency: "ZRX",
                    amount: 100,
                    rate: 0.19,
                    cgRate: 0.000005
                },
                bought: {
                    currency: "KNC",
                    amount: 34
                }
            },
            trades: []
        }),
        mounted() {
            this.fetchOpenTrades();
        }
    }
</script>

<style>
    table{
        width:100%;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 5px;
        text-align: left;
    }
</style>