'use strict';

const util = require('util');
const client = require('./services/coinbase-client').create();
const fetchRates = util.promisify(client.getBuyPrice).bind(client);
const coins = require("./services/settings").COINS;
const storage = require("./services/s3-bucket");
const reports = require("./services/reports");

module.exports.poll = async function () {
    const prices = [];
    for (let coin of coins) {
        if (coin) {
            let price = await fetchRates({'currencyPair': coin + "-EUR"});
            delete price.data.currency;
            prices.push(price.data);
        }
    }

    console.log(prices);

    let report = await reports.buildReport(prices);
    await storage.storeReport(report);
}
