module.exports = {

    credentials: {'apiKey': 'API KEY', 'apiSecret': 'API SECRET', strictSSL: false},

    create: function () {
        let Client = require('coinbase').Client;
        return new Client(this.credentials);
    }
};