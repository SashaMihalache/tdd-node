// models/Rack.js

class Rack {
  constructor(startHour, endHour) {
    this.start = {
      hour: startHour,
    };
    this.end = {
      hour: endHour,
    };
  }
}

module.exports = Rack;
