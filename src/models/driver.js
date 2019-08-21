class Driver {
  constructor(attrs) {
    this.Name = '';
    this.Trips = [];

    if (attrs) {
      Object.assign(this, attrs);
    }
  }

  clone() {
    return new Driver(clone(this));
  }

  totalMilesDriven() {
    const addMiles = (accumulator, trip) => accumulator + trip.Miles;
    return this.Trips.reduce(addMiles, 0);
  }

  totalTimeDriven() {
    const addDuration = (accumulator, trip) => accumulator + trip.TotalDriveTime;
    return this.Trips.reduce(addDuration, 0);
  }

  avgMPH() {
    return Math.round(60 / (this.totalTimeDriven() / this.totalMilesDriven()));
  }
}

module.exports = Driver;
