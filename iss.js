/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";

  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const ip = JSON.parse(body).ip;
    if (!ip) {
      callback(error, null);
    } else {
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = "https://freegeoip.app/json/";
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body); // parse string to object keys named latitude & longitude
    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
