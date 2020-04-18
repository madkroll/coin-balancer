const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const thresholdInMs = 3 * 60 * 60 * 1000;
const baseline = "1587162997926";

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
            const rateName = nextRateReference.Key.replace("rates/", "");
            const rateTimestamp = Number(rateName.split("-")[0]);

            if (!rateName.startsWith(baseline) && rateTimestamp - since < 0) {
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

