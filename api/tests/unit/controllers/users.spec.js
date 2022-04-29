const usersController = require("../../../controllers/users");
const User = require("../../../models/users");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("users controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    test("it returns a user with a 200 status code", async () => {
      jest.spyOn(User, "findById").mockResolvedValue(
        new User({
          id: 1,
          username: "Username 1",
          password: "Password 1",
          name: "Test User 1",
        })
      );

      const mockReq = { params: { id: 1 } };
      await usersController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        id: 1,
        username: "Username 1",
        password: "Password 1",
        name: "Test User 1",
      });
    });
  });
});
