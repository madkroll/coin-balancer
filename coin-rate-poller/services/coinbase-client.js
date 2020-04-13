const Client = require('coinbase').Client;

const credentials = {'apiKey': 'API KEY', 'apiSecret': 'API SECRET', strictSSL: false};

module.exports = {

    create: function () {
        return new Client(credentials);
    }
};