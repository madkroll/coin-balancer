module.exports = {

    build: function () {
        let client = require('./cb-client').create();
        let coins = require("../settings").COINS;

        let prices = [];

        require('async').each(coins, function (coin, callback) {
            client.getBuyPrice({'currencyPair': coin + "-EUR"}, function (err, price) {
                if (price) {
                    prices.push(price.data);
                    callback();
                }
            });
        }, function () {
            let btcPrice = parseFloat(prices.find(nextRate => nextRate.base === "BTC").amount).toFixed(2);
            prices.sort(function (a, b) {
                return ('' + a.base).localeCompare(b.base);
            });
            for (let nextRate of prices) {
                nextRate.btcEquivalent = (btcPrice / nextRate.amount).toFixed(2);
            }

            let report = {};
            report.timestamp = Date.now();
            report.date = new Date(report.timestamp);
            report.prices = prices;

            storeReport(report);
        });
    }
};

function storeReport(report) {
    let timestamp = report.timestamp;
    let date = report.date;
    let fileName = "./reports/" + timestamp + "_" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + ".json";
    require("fs").writeFileSync(fileName, JSON.stringify(report));
}