const client = require('./cb-client').create();
const coins = require("../settings").COINS;
const util = require('util');

module.exports = {

    build: async function () {
        const fetchRates = util.promisify(client.getBuyPrice).bind(client);

        const prices = [];
        for (let coin of coins) {
            if (coin) {
                let price = await fetchRates({'currencyPair': coin + "-EUR"});
                delete price.data.currency;
                prices.push(price.data);
            }
        }

        let report = await buildReport(prices);
        await storeReport(report);
    },

    fetch: function () {
        const path = require('path');
        const fs = require('fs');
        const directoryPath = path.join(__dirname, '../reports');
        let reportsPaths = fs.readdirSync(directoryPath);

        let results = [];
        for (let nextPath of reportsPaths) {
            results.push(JSON.parse(fs.readFileSync(path.join(directoryPath, nextPath))));
        }

        return results;
    }
};

async function buildReport(prices) {
    prices.sort(function (a, b) {
        return ('' + a.base).localeCompare(b.base);
    });

    let btcPrice = parseFloat(prices.find(nextRate => nextRate.base === "BTC").amount);
    for (let nextRate of prices) {
        nextRate.btcEquivalent = btcPrice / nextRate.amount;
    }

    let report = {};
    report.timestamp = Date.now();
    report.date = new Date(report.timestamp);
    report.prices = prices;

    return report;
}

async function storeReport(report) {
    let timestamp = report.timestamp;
    let date = report.date;
    let fileName = "./reports/" + timestamp + "_" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + ".json";
    require("fs").writeFileSync(fileName, JSON.stringify(report));
}