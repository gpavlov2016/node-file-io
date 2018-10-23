const csv = require("csv-query");

csv.createFromFile(
  __dirname + './../data.csv'
).then(function (db) {
  return db.find({
    username: '15@b.com',
    crypto: 'BTC'
  });
}).then(function (records) {
  // Do some stuff
  console.log(`Found ${records.length} records`);
}).catch(function (error) {
  console.log(error);
  throw error;
});
