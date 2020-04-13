'use strict';

const s3Bucket = require('./services/s3-bucket');

module.exports.fetch = async function(event, context) {
    const rates = JSON.stringify(await s3Bucket.loadReports())

    return {
        statusCode: 200,
        body: rates,
    };
};
