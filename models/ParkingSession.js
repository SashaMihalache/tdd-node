// models/ParkingSession.js

// const { convertToUTC } = require("../helpers/time");

class ParkingSession {
  constructor(start, end) {
    this.startDate = new Date(start);
    this.endDate = new Date(end);

    this.start = {
      hour: this.startDate.getHours(),
      minute: this.startDate.getMinutes(),
      second: this.startDate.getSeconds(),
    };

    this.end = {
      hour: this.endDate.getHours(),
      minute: this.endDate.getMinutes(),
      second: this.endDate.getSeconds(),
    };
  }

  calculateWholeDuration() {
    return Math.round(
      (this.endDate.getTime() - this.startDate.getTime()) / 1000
    );
  }
}

module.exports = ParkingSession;
