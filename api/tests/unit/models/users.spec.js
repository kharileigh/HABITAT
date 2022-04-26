const User = require("../../../models/users");

jest.mock("../../../models/users");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");
