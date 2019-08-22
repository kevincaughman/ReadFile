const fs = require('fs');
const readline = require('readline');
var factory = require('./controllers/factory');
var DataStore = require('./shared/data_store');
var commands = require('./shared/commands');

if (process.argv.length < 3) {
  console.log('A filename with an extension is required: node ' + process.argv[1] + ' FILENAME.txt');
  process.exit(1);
}

async function processLineByLine() {
  const filename = process.argv[2];
  const store = new DataStore();

  const rl = readline.createInterface({
    input: fs.createReadStream(filename, 'utf8'),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.includes(commands.DRIVER)) {
      const driver = factory.CreateDriver(line, commands.DRIVER);
      store.addDriver(driver);
    }
    else if (line.includes(commands.TRIP)) {
      const trip = factory.CreateTrip(line, commands.TRIP);
      store.addTrip(trip);
    }
  });

  rl.on('close', (close) => {
    const report = factory.CreateReport(store);
    console.log(report);
    return report;
  });
}

processLineByLine();