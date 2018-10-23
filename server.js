"use strict";

const express = require('express');  // http://expressjs.com/en/4x/api.html
const app = express();

const PORT = 8080;  // Make sure port 8080 is available on your machine.

// Return all the transactions (rows) in {file} with given username and cryptocurrency type.
app.get('/get_txns/:file/:username/:crypto', (req, res) => {
  const file = req.params.file;  // File containing data. 
  const username = req.params.username;  // Username to be matched.
  const crypto = req.params.crypto;  // Cryptocurrency to be matched.
  

});

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT + '.');
});



