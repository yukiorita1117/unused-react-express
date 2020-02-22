const fs = require("fs");
const csv = require("csv-parser");

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
module.exports = lead_csv;
