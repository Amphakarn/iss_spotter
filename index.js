const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const i in passTimes) {
    let datetime = new Date(passTimes[i].risetime);
    console.log(`Next pass at ${datetime} for ${passTimes[i].duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});



// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });


// fetchCoordsByIP(null, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log('It worked! Returned coordinates: ', coords);
//   }
// });

// const coordinates = { latitude: 43.6535, longitude: -79.402 };

// fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log('It worked! Returned flyover time: ');
//     console.log(passTimes);
//   }
// });