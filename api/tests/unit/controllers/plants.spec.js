const plantsController = require('../../../controllers/plants')
const Plant = require('../../../models/Plant');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('plants controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns plants with a 200 status code', async () => {
            jest.spyOn(Book, 'all', 'get')
                 .mockResolvedValue(['Test Plant 1', 'Test PLant 2']);
            await plantsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['Test Plant 1', 'Test Plant 2']);
        })
    });

    describe('show', () => {
        test('it returns a plant with a 200 status code', async () => {
            let testPlant = {
                plantId: 1, plant_name: 'Test Plant'
            }
            jest.spyOn(Plant, 'findById')
                .mockResolvedValue(new Book(testPlant));
                
            const mockReq = { params: { id: 1 } }
            await plantsController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Book(testPlant));
        })
    });

    describe('create', () => {
        test('it returns a new plant with a 201 status code', async () => {
            let testPlant = {
                plantId: 2, plant_name: 'New Test Plant'
            }
            jest.spyOn(Plant, 'create')
                .mockResolvedValue(new Book(testPlant));
                
            const mockReq = { body: testBook }
            await plantsController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Plant(testPlant));
        })
    })


    describe('update', () => {
        test('it returns an updated plant name with a 204 status code', async () => {
            let updatedTestPlant = {
                plantId: 2, plant_name: 'Updated Test Plant'
            }
            jest.spyOn(Plant, 'update')
                .mockResolvedValue(Plant(updatedTestPlant));
                
            const mockReq = { body: testBook }
            await plantsController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
            expect(mockJson).toHaveBeenCalledWith(Plant(updatedTestPlant));
        })
    })
    

    describe('destroy', () => {
        test('it returns a 204 status code on successful deletion', async () => {
            jest.spyOn(Plant.prototype, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { id: 1 } }
            await plantController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });

});