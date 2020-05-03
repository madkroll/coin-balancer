const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const prefix = "trades/open/";

module.exports = {

    loadOpenTrades: async function () {
        const listAllInBucket = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: prefix
        };

        let foundTrades = [];

        let storedTradesInfo = await s3.listObjectsV2(listAllInBucket).promise();
        foundTrades = foundTrades.concat(await readPage(storedTradesInfo.Contents));

        while(storedTradesInfo.IsTruncated) {
            listAllInBucket.ContinuationToken = storedTradesInfo.NextContinuationToken;
            storedTradesInfo = await s3.listObjectsV2(listAllInBucket).promise();
            foundTrades = foundTrades.concat(await readPage(storedTradesInfo.Contents));
        }

        return foundTrades;
    }
};

async function readPage(pageContent) {
    const foundTrades = [];
    for (let nextTradeReference of pageContent) {
        const loadGivenTrade = {
            Bucket: bucket,
            Key: nextTradeReference.Key
        };

        const trade = await s3.getObject(loadGivenTrade).promise();
        foundTrades.push(JSON.parse(trade.Body.toString()));
    }

    return foundTrades;
}
