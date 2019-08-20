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
}

module.exports = Trip;
