var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var factory = require('../src/controllers/factory');
var DataStore = require('../src/shared/data_store');
var commands = require('../src/shared/commands');

describe('ReadFile Test Suite', function() {
    describe ('Factory Tests', function() {
        it('should return true if a driver was created with a Name equal to Dan.', function() {
            const driver = factory.CreateDriver('Driver Dan', commands.DRIVER);
            driver.should.not.be.null;
            driver.should.have.property('Name').equal('Dan');
          });
          
          it('should return true if a trip was created with DriverName: Dan, Start:07:15, End: 07:45, and Miles: 17', function() {
            const trip = factory.CreateTrip('Trip Dan 07:15 07:45 17.3', commands.TRIP);
            trip.should.not.be.null;
            trip.should.have.property('DriverName').equal('Dan');
            trip.should.have.property('StartTime').equal('7:15 AM');
            trip.should.have.property('EndTime').equal('7:45 AM');
            trip.should.have.property('TotalDriveTime').equal(30);
            trip.should.have.property('Miles').equal(17);
          });
    });

    describe ('DataStore Tests', function() {
        before(function() {
            this.store = new DataStore();
            this.driver1 = factory.CreateDriver('Driver Dan', commands.DRIVER);
            this.driver2 = factory.CreateDriver('Driver Alex', commands.DRIVER);
            this.trip = factory.CreateTrip('Trip Dan 07:15 07:45 17.3', commands.TRIP);
        });

        it('should initialize datastore', function() {
            this.store.should.not.be.null;
            this.store.should.have.property('Drivers');
        });

        it('should add a driver to the data store', function() {
            this.store.addDriver(this.driver1);
            this.store.should.have.property('Drivers').with.lengthOf(1);            
        });

        it('should add a second driver to the data store', function() {
            this.store.addDriver(this.driver2);
            this.store.should.have.property('Drivers').with.lengthOf(2);            
        });

        it('should not add a trip with an avg mph under 5', function() {
            const driver1TripCount = this.store.Drivers.find(d => d.Name == this.driver1.Name).Trips.length;
            const invalidTrip = factory.CreateTrip(`Trip ${this.driver1.Name} 07:15 07:45 1.3`, commands.TRIP);
            this.store.addTrip(invalidTrip);
            this.store.Drivers.find(d => d.Name == this.driver1.Name).should.have.property('Trips').with.lengthOf(driver1TripCount);
          });

          it('should not add a trip with an avg mph over 100', function() {
            const driver1TripCount = this.store.Drivers.find(d => d.Name == this.driver1.Name).Trips.length;
            const invalidTrip = factory.CreateTrip(`Trip ${this.driver1.Name} 07:15 07:45 100.3`, commands.TRIP);
            this.store.addTrip(invalidTrip);
            this.store.Drivers.find(d => d.Name == this.driver1.Name).should.have.property('Trips').with.lengthOf(driver1TripCount);
          });

        it('should add a trip to driver1 in the data store based on driver name', function() {
            this.store.addTrip(this.trip);
            const driverWithTrip = this.store.Drivers.find(d => d.Name == this.trip.DriverName);
            driverWithTrip.should.have.property('Trips').with.lengthOf(1);          
        });

        it('should add a second trip to driver1 in the data store based on driver name', function() {
            const newTrip = factory.CreateTrip(`Trip ${this.driver1.Name} 06:12 06:32 21.8`, commands.TRIP);
            this.store.addTrip(this.trip);
            const driverWithTrip = this.store.Drivers.find(d => d.Name == this.trip.DriverName);
            driverWithTrip.should.have.property('Trips').with.lengthOf(2);          
        });

        it('should create a report line with a total sum of values for driver1', function() {
            const currentDriver = this.store.Drivers.find(d => d.Name == this.driver1.Name);
            const totalMiles = currentDriver.totalMilesDriven();
            const avgMPH = currentDriver.avgMPH();
            const reportLine = factory.CreateReportLine(this.driver1);
            reportLine.should.not.be.null;
            reportLine.should.have.property('DriverName').equal(this.driver1.Name);       
            reportLine.should.have.property('TotalMiles').equal(totalMiles);       
            reportLine.should.have.property('AvgMPH').equal(avgMPH);       
        });

        it('should create a report and return the output as a string', function() {
            const report = factory.CreateReport(this.store);
            report.should.not.equal('');         
        });
    });
});