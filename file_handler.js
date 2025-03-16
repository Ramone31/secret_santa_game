const fs = require("fs");
const csv = require("csv-parser");
const fastCsv = require("fast-csv");

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

function writeCSV(filePath, data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    fastCsv
      .write(data, { headers: true })
      .pipe(ws)
      .on("finish", resolve)
      .on("error", reject);
  });
}

module.exports = { readCSV, writeCSV };
