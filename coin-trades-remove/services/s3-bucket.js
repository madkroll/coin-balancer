const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";

module.exports = {

    removeTrade: async function (timestamp) {
        const findToRemove = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: 'trades/open/' + timestamp
        };

        const tradesToRemove = await s3.listObjectsV2(findToRemove).promise();

        for (let nextTradeToRemove of tradesToRemove.Contents) {
            const removeTrade = {
                Bucket: bucket,
                Key: nextTradeToRemove.Key
            };

            await s3.deleteObject(removeTrade).promise();
        }
    }
};

