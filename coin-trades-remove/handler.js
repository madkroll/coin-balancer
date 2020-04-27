'use strict';

const s3Bucket = require('./services/s3-bucket');

module.exports.remove = async function (event, context) {
    const requestBody = JSON.parse(event.body);

    console.log("Removing trade requested: " + requestBody.timestamp);
    await s3Bucket.removeTrade(requestBody.timestamp);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Requested-With,X-Requested-By,X-Api-Key',
            'Access-Control-Allow-Methods': 'GET'
        }
    };
};
