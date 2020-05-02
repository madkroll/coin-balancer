const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const prefix = "rates/";
const millisecondsInHour = 60 * 60 * 1000;
const baseline = "1587162997926";

module.exports = {

    loadReports: async function (ago) {
        const since = Number(Date.now() - ago * millisecondsInHour);

        const listAllInBucket = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: prefix
        };

        let foundRates = [];
        let storedRatesInfo = await s3.listObjectsV2(listAllInBucket).promise();
        foundRates = foundRates.concat(await readPage(storedRatesInfo.Contents, since));

        while(storedRatesInfo.IsTruncated) {
            listAllInBucket.ContinuationToken = storedRatesInfo.NextContinuationToken;
            storedRatesInfo = await s3.listObjectsV2(listAllInBucket).promise();
            foundRates = foundRates.concat(await readPage(storedRatesInfo.Contents, since));
        }

        return foundRates;
    }
};

async function readPage(pageContent, since) {
    const foundRates = [];

    for (let nextRateReference of pageContent) {
        const rateName = nextRateReference.Key.replace(prefix, "");
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

