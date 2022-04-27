const { request } = require("express");

describe("events endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () => console.log("Test running on port 5000"));
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close();
  });

  it("should return all events data", async () => {
    const res = await request(api).get("/events");
    expect(res.body).toHaveLength(4);
  });

  it("should retrieve events for specific plants", async () => {
    const res = await request(api).get("/events/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Event1");
  });

  it("should delete an event", async () => {
    const res = await request(api).delete("/events/1");
    expect(res.statusCode).toEqual(204);

    const eventRes = await request(api).get("/events/1");
    expect(eventRes.statusCode).toEqual(404);
    expect(eventRes.body).toHaveProperty("err");
  });
});
