'use strict';

const fetch = require("node-fetch");
const storage = require("./services/s3-bucket");

module.exports.poll = async function () {
    const response = await fetch.default("https://www.coinbase.com/api/v2/assets/prices?base=BTC&filter=listed&resolution=latest");
    const jsonBody = await response.json();

    const now = Date.now();
    const report = {
        timestamp: now,
        date: new Date(now),
        prices: jsonBody.data
    };

    await storage.storeReport(report);
}
