var Driver = require('../models/driver');
var Trip = require('../models/trip');
var ReportLine = require('../models/report_line');
const moment = require('moment');
const NEW_LINE = "\n";

module.exports = {
  CreateDriver: function(line, command) {
    let driverName = line.split(command)[1].replace(/\\/g, '').replace('}', '').trim();
    return new Driver({ Name: driverName });
  },
  CreateTrip: function(line, command) {
    let tripData = line.split(command)[1].replace(/\\/g, '').replace('}', '').split(' ');
    let tripDriverName = tripData[1];
    let tripStartTime = moment().hour(parseInt(tripData[2].split(':')[0])).minutes(parseInt(tripData[2].split(':')[1])).seconds(0).milliseconds(0);
    let tripEndTime = moment().hour(parseInt(tripData[3].split(':')[0])).minutes(parseInt(tripData[3].split(':')[1])).seconds(0).milliseconds(0);
    let tripTotalDriveTime = tripEndTime.diff(tripStartTime, 'minutes');
    let tripTotalMiles = parseInt(Math.round(tripData[4]));

    return new Trip({ DriverName: tripDriverName, StartTime: tripStartTime.format('LT'), EndTime: tripEndTime.format('LT'), TotalDriveTime: tripTotalDriveTime, Miles: tripTotalMiles });
  },
  CreateReportLine: function(driver) {
    let totalDriveTime = driver.totalTimeDriven();
    let totalMiles = driver.totalMilesDriven();
    let avgMPH = driver.avgMPH();

    return new ReportLine({ DriverName: driver.Name, DriveTime: totalDriveTime, TotalMiles: totalMiles, AvgMPH: avgMPH });
  },
  CreateReport: function(data) {
    let report = '';
    let reportLines = [];

    data.Drivers.forEach(d => {
      let line = this.CreateReportLine(d);
      reportLines.push(line);
    });

    reportLines.sort((a, b) => b.TotalMiles - a.TotalMiles).forEach(rl => {
      report += `${rl.DriverName}: ${rl.TotalMiles} miles ${rl.TotalMiles > 0 ? '@ ' + rl.AvgMPH + ' mph' : ''}${NEW_LINE}`;
    });

    return report;
  }
}
