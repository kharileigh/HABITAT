const eventsController = require("../../../controllers/events");
const Event = require("../../../models/events");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));

const mockRes = { status: mockStatus };

describe("events controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns events with a 200 status code", async () => {
      jest.spyOn(Event, "all", "get").mockResolvedValue(["event1", "event2"]);
      await eventsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["event1", "event2"]);
    });
  });

  describe("show", () => {
    test("it returns an event with a 200 status code", async () => {
      let testEvent = {
        id: 1,
        plantid: 1,
        userid: 1,
      };
      jest.spyOn(Event, "findById").mockResolvedValue(new Event(testEvent));

      const mockReq = { params: { id: 1 } };
      await eventsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Event(testEvent));
    });
  });

  describe("destroy", () => {
    test("it returns a 204 status code on successful deletion", async () => {
      jest.spyOn(Event.prototype, "destroy").mockResolvedValue("Deleted");

      const mockReq = { params: { id: 1 } };
      await eventsController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
  });
});
