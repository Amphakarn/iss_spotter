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

const fetchISSFlyOverTimes = function(coords, callback) {
  // const url = `http://api.open-notify.org/iss-now.json`;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(msg, null);
    }

    const resArray = JSON.parse(body).response;
    callback(null, resArray);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
