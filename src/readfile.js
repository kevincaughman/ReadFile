const fs = require('fs');
const readline = require('readline');
var util = require('./controllers/utilities');
var DataStore = require('./shared/data_store');
const DRIVER = 'Driver';
const TRIP = 'Trip';

async function processLineByLine() {
  const filename = process.argv[2];
  const store = new DataStore();

  const rl = readline.createInterface({
    input: fs.createReadStream(filename, 'utf8'),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.includes(DRIVER)) {
      const driver = util.CreateDriver(line, DRIVER);
      store.addDriver(driver);
    }
    else if (line.includes(TRIP)) {
      const trip = util.CreateTrip(line, TRIP);
      store.addTrip(trip);
    }
  });

  rl.on('close', (close) => {
    const report = util.CreateReport(store);
    console.log(report);
    return report;
  });
}

processLineByLine();
