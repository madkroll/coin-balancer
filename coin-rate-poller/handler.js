'use strict';

exports.poll = async (event, context, callback) => {
    // load currency list
    // for each currency -> query rate
    // merge all rates to array, build report

    let report = {};
    report.timestamp = Date.now();
    report.date = new Date(report.timestamp);
    report.field = "value";
    report.anotherField = "another-value";
    await require("./services/s3-bucket").storeReport(report);
};
