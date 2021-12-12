const ParkingSession = require("./models/ParkingSession");
const DurationService = require("./services/duration/DurationService");

const parkingSession = new ParkingSession(
  "2021-08-09 08:10:20",
  "2021-08-09 08:50:20"
);

console.log(parkingSession);
