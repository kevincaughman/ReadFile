class Driver {
  constructor(attrs) {
    this.Name = '';
    this.TotalDriveTime = 0;
    this.TotalMiles = 0;
    this.AvgMPH = 0;

    if (attrs) {
      Object.assign(this, attrs);
    }
  }

  clone() {
    return new Driver(clone(this));
  }
}

module.exports = Driver;
