// DurationService.spec.js

const DurationService = require("./DurationService");

const ParkingSession = require("../models/ParkingSession");
const Rack = require("../models/Rack");

describe("DurationService", () => {
  // dupa baga si asta cu before each (explica de setup and teardown)
  // you might want to do something repetitive
  let rack = null;

  beforeEach(() => {
    rack = new Rack(8, 18);
  });

  afterEach(() => {
    rack = null;
  });

  it("Case 0  - should return null if no session is provided", () => {
    const session = new ParkingSession(
      "2021-08-09 08:10:20",
      "2021-08-09 08:50:20"
    );

    expect(DurationService(session, null)).toBeNull();
    expect(DurationService(null)).toBeNull();
  });

  it("Case 0  - should return null if session or rack hours is not of correct object type", () => {
    const session = new ParkingSession(
      "2021-08-09 08:10:20",
      "2021-08-09 08:50:20"
    );

    expect(DurationService({ test: "a" })).toBeNull();
    expect(DurationService(session, { test: "test" })).toBeNull();
  });

  it("Case 1  - should return null for sessions outside of rack hour interval on the left", () => {
    expect(
      DurationService(
        new ParkingSession("2021-08-09 05:10:20", "2021-08-09 07:50:20"),
        rack
      )
    ).toBeNull();
  });

  it("Case 1' - should return null for sessions outside of rack hour interval on the left", () => {
    expect(
      DurationService(
        new ParkingSession("2021-08-09 07:50:00", "2021-08-09 08:00:00"),
        {
          start: 8,
          end: 18,
        }
      )
    ).toBeNull();
  });

  it("Case 2  - should return null for sessions outside of rack hour interval on the right", () => {
    expect(
      DurationService(
        new ParkingSession("2021-08-09 05:10:20", "2021-08-09 07:50:20"),
        rack
      )
    ).toBeNull();
  });

  it("Case 2' - should return null for sessions outside of rack hour interval on the right", () => {
    expect(
      DurationService(
        new ParkingSession("2021-08-09 18:00:00", "2021-08-09 18:50:20"),
        rack
      )
    ).toBeNull();
  });

  it("Case 3  - should return duration in seconds when a session is inside rack hour interval", () => {
    // show with arrays

    const inputs = [
      {
        session: new ParkingSession(
          "2021-08-09 10:00:00",
          "2021-08-09 11:50:20"
        ),
        rack,
        expected: 1 * 3600 + 50 * 60 + 20,
      },
      {
        session: new ParkingSession(
          "2021-08-09 11:00:00",
          "2021-08-09 11:33:22"
        ),
        rack,
        expected: 33 * 60 + 22,
      },
      {
        session: new ParkingSession(
          "2021-08-09 11:00:00",
          "2021-08-09 15:00:00"
        ),
        rack,
        expected: 4 * 3600,
      },
    ];

    inputs.forEach((i) => {
      expect(DurationService(i.session, i.rack)).toEqual(i.expected);
    });
  });

  // SO FAR, pretty easy, right? you could've done this directly in your head

  it("Case 4  - should split session and calculate only for interval inside rack hours for left overlapping session", () => {
    const inputs = [
      {
        session: new ParkingSession(
          "2021-08-09 04:00:00",
          "2021-08-09 10:30:24"
        ),
        rack,
        expected: 2 * 3600 + 30 * 60 + 24,
      },
      {
        session: new ParkingSession(
          "2021-08-09 07:00:00",
          "2021-08-09 11:50:20"
        ),
        rack,
        expected: 3 * 3600 + 50 * 60 + 20,
      },
    ];

    inputs.forEach((i) => {
      expect(DurationService(i.session, i.rack)).toEqual(i.expected);
    });
  });

  it("Case 5  - should split session and calculate only for interval inside rack hours for right overlapping session", () => {
    const inputs = [
      {
        session: new ParkingSession(
          "2021-08-09 16:00:00",
          "2021-08-09 20:50:20"
        ),
        rack,
        expected: 2 * 3600,
      },
      {
        session: new ParkingSession(
          "2021-08-09 17:32:20",
          "2021-08-09 20:50:20"
        ),
        rack,
        expected: 27 * 60 + 40,
      },
      {
        session: new ParkingSession(
          "2021-08-09 15:59:50",
          "2021-08-09 20:50:20"
        ),
        rack,
        expected: 2 * 3600 + 10,
      },
    ];

    inputs.forEach((i) => {
      expect(DurationService(i.session, i.rack)).toEqual(i.expected);
    });
  });

  // showcase even if you move rack hours
  it("Case 6  - should work even if rack hours are different", () => {
    const inputs = [
      {
        session: new ParkingSession(
          "2021-08-09 06:00:00",
          "2021-08-09 10:50:20"
        ),
        rack: new Rack(7, 18),
        expected: 3 * 3600 + 50 * 60 + 20,
      },
      {
        session: new ParkingSession(
          "2021-08-09 06:00:00",
          "2021-08-09 10:50:20"
        ),
        rack: new Rack(9, 14),
        expected: 1 * 3600 + 50 * 60 + 20,
      },
    ];

    inputs.forEach((i) => {
      expect(DurationService(i.session, i.rack)).toEqual(i.expected);
    });
  });
});
