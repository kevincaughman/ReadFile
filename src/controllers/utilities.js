var Driver = require('../models/driver');
var Trip = require('../models/trip');
const moment = require('moment');

module.exports = {
  CreateDriver: function(line) {
    let driverName = line.split('Driver')[1].replace(/\\/g, '').replace('}', '').trim();
    //console.log(`Creating new driver ${driverName}...`);
    return new Driver({ Name: driverName });
  },
  CreateTrip: function(line) {
    let tripData = line.split('Trip')[1].replace(/\\/g, '').replace('}', '').split(' ');
    let tripDriverName = tripData[1];
    //console.log(`creating trip data for ${tripDriverName}...`);
    let tripStartTime = moment().hour(parseInt(tripData[2].split(':')[0])).minutes(parseInt(tripData[2].split(':')[1])).seconds(0);
    let tripEndTime = moment().hour(parseInt(tripData[3].split(':')[0])).minutes(parseInt(tripData[3].split(':')[1])).seconds(0);
    let tripTotalDriveTime = tripEndTime.diff(tripStartTime, 'minutes');
    let tripTotalMiles = parseInt(Math.round(tripData[4]));
    let tripAvgMPH = Math.round(60 / (tripTotalDriveTime / tripTotalMiles));

    return new Trip({ DriverName: tripDriverName, DriveTime: tripTotalDriveTime, Miles: tripTotalMiles, AvgMPH: tripAvgMPH });
  }
}
