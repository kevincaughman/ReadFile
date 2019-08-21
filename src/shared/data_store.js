class DataStore {
  constructor(attrs) {
    this.Drivers = [];
  }

  addDriver(driver) {
    this.Drivers.push(driver);
  }

  addTrip(trip) {
    if (!trip.isInSpeedRange()) {
      return;
    }

    const driver = this.Drivers.find(d => d.Name == trip.DriverName);
    driver.Trips.push(trip);
  }
}

module.exports = DataStore;