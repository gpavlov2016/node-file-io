"use strict";

const express = require('express');  // http://expressjs.com/en/4x/api.html
var compression = require('compression')

const app = express();
app.use(compression());

const PORT = 8080;  // Make sure port 8080 is available on your machine.

const {File} = require('fileio');
const randomInt = require('random-int');
const fs = require('fs');

// Return all the transactions (rows) in {file} with given username and cryptocurrency type.
app.get('/get_txns/:method/:file/:username/:crypto', (req, res) => {
  const file = req.params.file;  // File containing data.
  const username = req.params.username;  // Username to be matched.
  const crypto = req.params.crypto;  // Cryptocurrency to be matched.
  const method = req.params.method;  // Method to use for file read

  const csvFilePath = __dirname + `/${file}`;
  if (method === 'fileio') {
    var label = randomInt(10000);
    console.time('read' + label);
    const file = new File(csvFilePath);
    file.read( true ) // If set to true, the data will be saved in File#cache
        .then( (data) => {
          console.timeEnd('read' + label);
          console.time('process' + label);
          var records = processData(data, username, crypto);
          console.timeEnd('process' + label);
          console.log('Records returned: ' + records.length);
          res.send({records});
          //console.log(data.toString());
        })
        .catch( err => console.log(err) );
  } else if (method === 'filestream') {
    var label = randomInt(10000);
    console.time('read+process' + label);
    const stream = fs.createReadStream(csvFilePath);
    var records = [];
    stream.on('data', (data) => {
      var partialRecords = processData(data, username, crypto);
      records = records.concat(partialRecords);
    });
    stream.on('end', () => {
      console.timeEnd('read+process' + label);
      console.log('Records returned: ' + records.length);
      res.send({records});
      //console.log(data.toString());
    });
  } else if (method === 'fsread') {
    var label = randomInt(10000);
    console.time('read' + label);
    fs.readFile(csvFilePath, (err, data) => {
      if (err) throw err;
      console.timeEnd('read' + label);
      console.time('process' + label);
      var records = processData(data, username, crypto);
      console.timeEnd('process' + label);
      console.log('Records returned: ' + records.length);
      res.send({records});
    });
  }
});


// Return all the transactions (rows) in {file} with given username and cryptocurrency type.
//This is the original API without "method"
app.get('/get_txns/:file/:username/:crypto', (req, res) => {
  const file = req.params.file;  // File containing data.
  const username = req.params.username;  // Username to be matched.
  const crypto = req.params.crypto;  // Cryptocurrency to be matched.

  const csvFilePath = __dirname + `/${file}`;
  var label = randomInt(10000);
  console.time('read' + label);
  fs.readFile(csvFilePath, (err, data) => {
    if (err) throw err;
    console.timeEnd('read' + label);
    console.time('process' + label);
    var records = processData(data, username, crypto);
    console.timeEnd('process' + label);
    console.log('Records returned: ' + records.length);
    res.send({records});
  });
});


function processData(data, username, crypto) {
  var dataStr = data.toString();
  var dataArr = dataStr.split('\n');
  // console.log('Lines read: ' + dataArr.length);
  var records = [];
  for (let line of dataArr) {
    var lineArr = line.split(',');
    //console.log(lineArr);
    if (line
        && lineArr[1] === username
        && lineArr[6] === crypto) {
          records.push(line);
    }
  }
  return records;
}


app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT + '.');
});
