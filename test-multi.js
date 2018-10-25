"use strict";
const num_requests = 50;  // Number of requests to make. Adjust if necessary.
const request_intervale = 100;  // Intervale between each request in millisecond. Adjust if necessary.

const rp = require('request-promise');
const randomInt = require('random-int');
const fs = require('fs');

console.log('Test Started.');

// Make {num_requests} at {request_intervale} millisecond intervale
function make_request(URL, counter, done) {
  let req_start = Date.now();  // Starting timestamp of the request. Used for calculating request duration.

  // Making request.
  rp(URL)
  .then((response) => {
		// The request is successful. Response is returned from server.
		let delay = (Date.now() - req_start) / 1000;  // Duration of the request in seconds.
		console.log('Request #' + counter + ' took ' + delay + ' seconds to complete.');
		if (counter >= num_requests) {
			setTimeout(done, 1000, counter, delay);
		} else {
			done(counter, delay);
		}
  })
  .catch((err) => {
		// If a request failed, log the error and exit.
		console.log('Request #' + counter + ' failed');
		console.log(err);
		process.exit();
  });
}

function execute_test(method, done) {
	let test_start = Date.now();  // Starting timestamp of the test. Used for calculating test duration.
	let total_delay = 0;  // Summation of the duration of each request.
	for (var i = 0; i < num_requests; i++) {
		var rand = randomInt(20);
		var filename = `data${rand}.csv`
    if (!fs.existsSync(filename)) {
      filename = 'data.csv'
    }
		var URL = `http://localhost:8080/get_txns/${method}/${filename}/15@b.com/BTC`
		setTimeout(
			make_request,
			i*request_intervale,
			URL,
			i+1,
			(counter, delay) => {
				total_delay += delay;
				if (counter >= num_requests) {
					let total_time = (Date.now() - test_start) / 1000;  // Test duration in seconds.
					console.log('Completed ' + num_requests + ' requests in ' + total_time + ' seconds. ');
					// Average time a request has to wait before receiving response.
					console.log('Average response time: ' + total_delay / num_requests + ' seconds');
					setTimeout(done, 2000);	//delay to clear unfinished op
				}
			});
	}
}

(async function() {
	var methods = ['fileio', 'filestream', 'fsread'];
	for (var m=0; m<methods.length; m++) {
		var method = methods[m];
		console.log(`Starting test using ${method} method`);
		await new Promise((next) => {
			execute_test(method, () => next());
		});
		console.log('\n');
	}
})();
