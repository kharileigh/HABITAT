const User = require('../../../models/user')

jest.mock("../../../models/users");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe('User', () => {
    beforeAll(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

describe("create", () => {
  test("it resolves with user on successful db query", async () => {
    let userData = { user_name: 'Test User', user_password: 'password', user_email: 'test@email.co.uk'}
    jest.spyOn(db, 'query')
        .mockResolvedValueOnce({rows: [ userData] });
    const result = await User.create('new User');
    expect(result).toBeInstanceOf(User)
  }

})