describe('user endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return user based on username and password', async () => {
        const res = await request(api).get('/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual('User1');
    })

}