const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";

module.exports = {

    loadReports: async function () {
        const listAllInBucket = {
            Bucket: bucket
        };

        const storedRatesInfo = await s3.listObjectsV2(listAllInBucket).promise();

        const foundRates = [];
        for (let nextRateReference of storedRatesInfo.Contents) {
            const loadGivenRate = {
                Bucket: bucket,
                Key: nextRateReference.Key
            };

            const rateContent = await s3.getObject(loadGivenRate).promise();
            foundRates.push(JSON.parse(rateContent.Body.toString()));
        }

        return foundRates;
    }
};

