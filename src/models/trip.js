const LOWER_SPEED_LIMIT = 5;
const UPPER_SPEED_LIMIT = 100;

class Trip {
  constructor(attrs) {
    this.DriverName= '';
    this.DriveTime = 0;
    this.Miles = 0;
    this.AvgMPH = 0;

    if (attrs) {
      Object.assign(this, attrs);
    }
  }

  clone() {
    return new Trip(clone(this));
  }

  speed () {
    return Math.round(60 / (this.DriveTime / this.Miles));
  }

  isInSpeedRange () {
    return (this.speed >= LOWER_SPEED_LIMIT && this.speed <= UPPER_SPEED_LIMIT);
  }
}

module.exports = Trip;
