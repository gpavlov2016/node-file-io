var csvFilePath = __dirname + './../data.csv';

// //1.7sec
// const csv = require("csv-query");
// console.time('csv');
// csv.createFromFile(
//   csvFilePath
// ).then(function (db) {
//   return db.find({
//     username: '15@b.com',
//     crypto: 'BTC'
//   });
// }).then(function (records) {
//   // Do some stuff
//   console.log(`Found ${records.length} records`);
//   console.timeEnd('csv');
// }).catch(function (error) {
//   console.log(error);
//   throw error;
// });

// const csv = require('csvtojson');
// console.time('csv');
// //0.5 sec to load csv to json
// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     console.timeEnd('csv');
//   });

// var fs = require('fs');
// console.time('csv');
// //reading file first time - 200ms
// //reading again - 30ms
// fs.readFile(csvFilePath, 'utf8', function(err, contents) {
//   console.timeEnd('csv');
// //    console.log(contents);
// });

// var lineReader = require('line-reader');
// console.time('csv');
// //time to read all file line by line - 0.4sec
// lineReader.eachLine(csvFilePath, function(line, last) {
//   //console.log(line);
//   // do whatever you want with line...
//   if(last){
//     // or check if it's the last one
//       console.timeEnd('csv');
//   }
// });

// const rl = require('readline-specific');
// console.time('csv');
// //read all lines - 150ms
// rl.alllines(csvFilePath, function(err, res) {
//   if (err) console.error(err)	//handling error
//   console.timeEnd('csv');
// })

// const {File} = require('fileio');
//
// console.time('csv');
// const file = new File(csvFilePath);
// file.read( true ) // If set to true, the data will be saved in File#cache
//     .then( (data) => {
//       dataStr = data.toString();
//       dataArr = dataStr.split('\n');
//       console.log(dataArr.length);
//       res = []
//       for (let line of dataArr) {
//         var lineArr = line.split(',');
//         //console.log(lineArr);
//         if (line && lineArr[1] === '15@b.com' && lineArr[6] === 'BTC') {
//               res.push(line);
//              }
//       }
//       console.log(res.length);
//       console.timeEnd('csv');
//       //console.log(data.toString());
//     })
//     .catch( err => console.log(err) );

const csv = require('csvtojson');
console.time('csv');
//800ms
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    res = []
    for (let obj of jsonObj) {
      if (obj.username === '15@b.com' && obj.crypto === 'BTC') {
        res.push(obj);
      }
    }
    console.log(res.length);
    console.timeEnd('csv');

  })
  .catch( err => console.log(err));
