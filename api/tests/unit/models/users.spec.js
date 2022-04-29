const User = require("../../../models/users");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with Users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });
      const all = await User.all;
      expect(all).toHavelength(4);
    });
  });

  describe("create", () => {
    test("it resolves with User on successful db query", async () => {
      let userData = {
        userid: 1,
        user_name: "testuser1",
        user_password: "testpass",
        user_email: "test@email.com",
        user_role: "user",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.create("New User");
      expect(result).toBeInstanceOf(User);
    });
  });

  describe();
});
