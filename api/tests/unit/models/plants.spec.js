const Plant = require('../../../models/plants');


jest.mock('../../../models/plants');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Book', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

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
            let plantData = { id: 1, title: 'Test Plant 1' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ plantData] });
            const result = await Plant.findById(1);
            expect(result).toBeInstanceOf(Plant)
        })
    });

    describe('create', () => {
        test('it resolves with a new plant on successful db query', async () => {
            let plantData = { plant_name: 'Test Plant 4' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...plantData, id: 1 }] });
            jest.spyOn(Author, 'findOrCreateByName')
                .mockResolvedValueOnce(new Plant({id: 4, name: 'Test Plant 4'}));
            const result = await Plant.create(plantData);
            expect(result).toHaveProperty('id')
        })
    });
    
})