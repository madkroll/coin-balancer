const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const thresholdInMs = 10 * 60 * 60 * 1000;

module.exports = {

    loadReports: async function () {
        const since = Number(Date.now() - thresholdInMs);

        const listAllInBucket = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: 'rates/'
        };

        const storedRatesInfo = await s3.listObjectsV2(listAllInBucket).promise();

        console.log(storedRatesInfo);

        const foundRates = [];
        for (let nextRateReference of storedRatesInfo.Contents) {
            let rateTimestamp = Number(
                nextRateReference.Key
                    .replace("rates/", "")
                    .split("-")[0]
            );

            if (rateTimestamp - since < 0) {
                // skip old records
                continue;
            }

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

