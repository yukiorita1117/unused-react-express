var express = require("express");
var router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");
// var load_csv = require("../data/load_csv.js");

// var inputFilePath = "../data/jukenresult.csv";

/* GET home page. */
router.get("/", function(req, res, next) {
  function lead_csv(inputFilePath) {
    var csv_data = [];
    var count = 0;
    return new Promise((resolve, reject) => {
      fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on("data", function(data) {
          try {
            //perform the operation
            count++;
            csv_data.push(data);
          } catch (err) {
            //error handler
            reject(err);
          }
        })
        .on("end", function() {
          //some final operation
          resolve(csv_data);
        });
    });
  }

  lead_csv("./data/jukenresult.csv").then(function(data) {
    res.send(data);
  });
});

module.exports = router;
