describe('plants endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Test server has stopped gracefully')
        api.close(done)
    });

    it('should return a list of all plants for user in database', async () => {
        const res = await request(api).get('/plants');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
    
    it('should create a new plant in database', async () => {
        const res = await request(api)
            .post('/plants')
            .send({
                plant_name: 'New Test Plant Added'
            })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('err');

        const plantRes = await.request(api).get('/plants/4');
        expect(plantRes.statusCode).toEqual(404);
        
    }) 
})