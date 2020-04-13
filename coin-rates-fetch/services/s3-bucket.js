const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const ratesFolder = "rates";

module.exports = {

    loadReports: async function () {
        const s3Request = {
            Bucket: bucket
        };

        const rates = await s3.listObjectsV2(s3Request).promise();
        console.log(rates);
        return rates;
    }
};

