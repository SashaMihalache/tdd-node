// SessionDurationService.js
const ParkingSession = require("../models/ParkingSession");
const Rack = require("../models/Rack");

const isSessionInvalid = (session, rack) => {
  return (
    !session || !(session instanceof ParkingSession) || !(rack instanceof Rack)
  );
};

const isSessionOutOfBounds = (session, rack) => {
  if (
    session.end.hour < rack.start.hour ||
    (session.end.hour == rack.start.hour && // case 1' e cu asta mare
      session.end.minute === 0 &&
      session.end.second === 0) ||
    session.start.hour >= rack.end.hour // case2' e cu >=
  )
    return true;

  return false;
};

const isLeftOverlappingSession = (session, rack) => {
  return (
    session.start.hour < rack.start.hour &&
    session.end.hour >= rack.start.hour &&
    session.end.hour <= rack.end.hour
  );
};

const isRightOverlappingSession = (session, rack) => {
  return (
    session.start.hour > rack.start.hour &&
    session.start.hour <= rack.end.hour &&
    session.end.hour >= rack.end.hour
  );
};

const calculateClippedDuration = ({
  remainingHours,
  remainingMinutes,
  remainingSeconds,
}) => {
  return remainingHours * 3600 + remainingMinutes * 60 + remainingSeconds;
};

function DurationService(session, rack) {
  if (isSessionInvalid(session, rack) || isSessionOutOfBounds(session, rack))
    return null;

  if (isLeftOverlappingSession(session, rack)) {
    return calculateClippedDuration({
      remainingHours: session.end.hour - rack.start.hour,
      remainingMinutes: session.end.minute,
      remainingSeconds: session.end.second,
    });
  } else if (isRightOverlappingSession(session, rack)) {
    return calculateClippedDuration({
      remainingHours: rack.end.hour - session.start.hour - 1,
      remainingMinutes: 60 - session.start.minute - 1,
      remainingSeconds: 60 - session.start.second,
    });
  }

  return calculateClippedDuration({
    remainingHours: session.end.hour - session.start.hour,
    remainingMinutes: session.end.minute - session.start.minute,
    remainingSeconds: session.end.second - session.start.second,
  });
}

module.exports = DurationService;
