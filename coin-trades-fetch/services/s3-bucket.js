const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";

module.exports = {

    loadOpenTrades: async function () {
        const listAllInBucket = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: 'trades/open/'
        };

        const storedTradesInfo = await s3.listObjectsV2(listAllInBucket).promise();

        const foundTrades = [];
        for (let nextTradeReference of storedTradesInfo.Contents) {
            const loadGivenTrade = {
                Bucket: bucket,
                Key: nextTradeReference.Key
            };

            const trade = await s3.getObject(loadGivenTrade).promise();
            foundTrades.push(JSON.parse(trade.Body.toString()));
        }

        return foundTrades;
    }
};

