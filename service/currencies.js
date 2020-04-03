module.exports = {

    crypto: function () {
        const CoinbasePro = require('coinbase-pro');
        const publicClient = new CoinbasePro.PublicClient();

        publicClient
            .getCurrencies()
            .then(currencies => currencies.filter(currency => currency.details.type === "crypto"))
            .then(currencies =>
                require('fs')
                    .writeFile("output.json", JSON.stringify(currencies), 'utf8', function (err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File.");
                            return console.log(err);
                        }

                        console.log("JSON file has been saved.");
                    })
            )
    }
};


