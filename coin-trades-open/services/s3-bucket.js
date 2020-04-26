const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const openTradesFolder = "trades/open";
const ratesContentType = "application/json";

module.exports = {

    store: async function (trade) {
        const timestamp = Number(trade.timestamp);
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const reportContent = JSON.stringify(trade);
        const resourceName = `${openTradesFolder}/${timestamp}-${year}-${month}-${day}-${trade.fromCoin}-${trade.toCoin}.json`;

        const destination = {
            Bucket: bucket,
            Key: resourceName,
            Body: reportContent,
            ContentType: ratesContentType
        };

        await s3.upload(destination).promise();
    }
};

