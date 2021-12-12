// models/ParkingSession.js

class ParkingSession {
  constructor(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    this.start = {
      hour: startDate.getHours(),
      minute: startDate.getMinutes(),
      second: startDate.getSeconds(),
    };

    this.end = {
      hour: endDate.getHours(),
      minute: endDate.getMinutes(),
      second: endDate.getSeconds(),
    };
  }
}

module.exports = ParkingSession;
