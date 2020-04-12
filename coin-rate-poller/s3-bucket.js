module.exports = {

    bucket: "coin-balancer",
    ratesFolder: "rates",
    ratesContentType: "application/json",

    storeReport: async function (report) {
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3();

        let timestamp = report.timestamp;
        let date = report.date;
        let reportContent = JSON.stringify(report);
        let resourceName = this.ratesFolder + "/" + timestamp + "-" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + ".json";

        const destination = {
            Bucket: this.bucket,
            Key: resourceName,
            Body: reportContent,
            ContentType: this.ratesContentType
        };

        await s3.upload(destination).promise().then(
            value => console.log(value)
        );
    }
};

