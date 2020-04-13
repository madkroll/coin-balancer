module.exports = {

    buildReport: async function (rates) {
        rates.sort(function (a, b) {
            return ('' + a.base).localeCompare(b.base);
        });

        let btcPrice = parseFloat(rates.find(nextRate => nextRate.base === "BTC").amount);
        for (let nextRate of rates) {
            nextRate.btcEquivalent = btcPrice / nextRate.amount;
        }

        let report = {};
        report.timestamp = Date.now();
        report.date = new Date(report.timestamp);
        report.prices = rates;

        return report;
    }
}