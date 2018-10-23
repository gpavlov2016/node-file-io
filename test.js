"use strict";
const num_requests = 50;  // Number of requests to make. Adjust if necessary.
const request_intervale = 100;  // Intervale between each request in millisecond. Adjust if necessary.

const rp = require('request-promise');

let URL = 'http://localhost:8080/get_txns/data.csv/15@b.com/BTC'

let counter = 0;  // Number of requests completed so far.
let test_start = Date.now();  // Starting timestamp of the test. Used for calculating test duration.
let total_delay = 0;  // Summation of the duration of each request. 
	   
console.log('Test Started.');
	   
// Make {num_requests} at {request_intervale} millisecond intervale
let requests = setInterval(() => {
  let req_start = Date.now();  // Starting timestamp of the request. Used for calculating request duration.
  
  // Making request.
  rp(URL)
  .then((response)=>{
	// The request is successful. Response is returned from server.  
	  
	counter++;  // Increment the counter when the request is successfully processed.
	let delay = (Date.now() - req_start) / 1000;  // Duration of the request in seconds.
	console.log('Request #' + counter + ' took ' + delay + ' seconds to complete.');
	
	total_delay += delay;  // Add the duration of this request to total_delay.
	
	// Clear the intervale (stop making additional requests) when {num_requests} requests have been made.
	if(counter >= num_requests) {
	  clearInterval(requests);
	  
	  let total_time = (Date.now() - test_start) / 1000;  // Test duration in seconds.
	  console.log('Completed ' + counter + ' requests in ' + total_time + ' seconds. ');
	  
	  // Average time a request has to wait before receiving response.
	  console.log('Average response time: ' + total_delay / counter + ' seconds');
	  
	  process.exit();
	}
  })
  .catch((err) => {
	// If a request failed, log the error and exit.
	counter++;
	console.log('Request #' + counter + ' failed');
	console.log(err);
	process.exit();
  });
}, request_intervale);
