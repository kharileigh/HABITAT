const Plant = require("../../../models/plants");

jest.mock("../../../models/plants");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init")

describe("Plant", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('all', () => {
    test('it resolves with plants on successful db query', async () => {
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}, {}]});
        const all = await Plant.all;
        expect(all).toHaveLength(3)
    })
});

  describe('findById', () => {
    test('it resolves with plant on successful db query', async () => {
        let plantData = { id: 1, plant_name: 'example 1', nickname: 'Test Plant 1', frequency: 12, count: 4}
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({rows: [ plantData ] });
        const result = await Plant.findById(1);
        expect(result).toBeInstanceOf(Plant)
    })
  });

  describe('create', () => {
    test('it resolves with plant on successful db query', async () => {
      let plantData = { plantid: 2, plant_name: 'example 2', nickname: 'Test Plant 2', frequency: 12, count: 4}
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({rows: [ { ...plantData, plantid: 2 }] });
        const result = await Plant.create(plantData);
        expect(result).toHaveProperty('plantid')
    })
});
});
