if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const readline = require('readline');
var util = require('./controllers/utilities');

async function processLineByLine() {
  let drivers = [];
  var filename = process.argv[2];
  console.log(`processing filename: ${filename}`);

  const rl = readline.createInterface({
    input: fs.createReadStream(filename, 'utf8'),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.includes("Driver")) {
      const newDriver = util.CreateDriver(line);
      drivers.push(newDriver);
    }
    else if (line.includes("Trip")) {
      const trip = util.CreateTrip(line);
      const driver = drivers.find(d => d.Name == trip.DriverName);

      if (!driver) {
        /* Driver could not be found so we are skipping this trip. */
        // console.log(`A driver with name ${trip.DriverName} could not be found`);
      }
      else {
        /* Driver found update trip info if trip avg mph is greater than or equal 5
         and not greater than 100. */
        // console.log(`Updating data for driver: ${trip.DriverName}`);

        if (trip.AvgMPH >= 5 && trip.AvgMPH <= 100) {
          driver.TotalDriveTime += trip.DriveTime;
          driver.TotalMiles += trip.Miles;
          driver.AvgMPH = Math.round(60 / (driver.TotalDriveTime / driver.TotalMiles));;
        }
      }
    }
  });

  rl.on('close', (close) => {
    console.log('File processed...');

    drivers.sort((a, b) => b.TotalMiles - a.TotalMiles).forEach(d => {
      console.log(`${d.Name}: ${d.TotalMiles} miles ${d.TotalMiles > 0 ? '@ ' + d.AvgMPH + ' mph' : ''}`);
    });
  });
}

processLineByLine();
