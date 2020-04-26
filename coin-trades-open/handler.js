'use strict';

const s3Bucket = require('./services/s3-bucket');

module.exports.open = async function (event, context) {
    await s3Bucket.store(JSON.parse(event.body));

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
