'use strict';

const s3Bucket = require('./services/s3-bucket');

module.exports.fetch = async function (event, context) {
    const rates = JSON.stringify(await s3Bucket.loadReports(Number(event.queryStringParameters.ago)));

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Requested-With,X-Requested-By,X-Api-Key',
            'Access-Control-Allow-Methods': 'GET'
        },
        body: rates,
    };
};
