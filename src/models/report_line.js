class ReportLine {
    constructor(attrs) {
      this.DriverName = '';
      this.TotalDriveTime = 0;
      this.TotalMiles = 0;
      this.AvgMPH = 0;
  
      if (attrs) {
        Object.assign(this, attrs);
      }
    }
  
    clone() {
      return new ReportLine(clone(this));
    }
  }
  
  module.exports = ReportLine;
  