const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = "coin-balancer";
const ratesFolder = "rates";
const ratesContentType = "application/json";

module.exports = {

    storeReport: async function (report) {
        const timestamp = report.timestamp;
        const date = report.date;
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const reportContent = JSON.stringify(report);
        const resourceName = `${ratesFolder}/${timestamp}-${year}-${month}-${day}.json`;

        const destination = {
            Bucket: bucket,
            Key: resourceName,
            Body: reportContent,
            ContentType: ratesContentType
        };

        await s3.upload(destination).promise();
    }
};

