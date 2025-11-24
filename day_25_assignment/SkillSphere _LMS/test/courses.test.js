const request = require("supertest");
const app = require("../index");

describe("Courses API", () => {

    it("GET /courses should return 200", async () => {
        const res = await request(app).get("/courses");
        if (res.status !== 200) throw new Error("Expected 200");
    });

    it("GET /courses/1 should return course object", async () => {
        const res = await request(app).get("/courses/1");
        if (!res.body.name) throw new Error("Course name missing");
    });

    it("GET /courses/999 should return 404", async () => {
        const res = await request(app).get("/courses/999");
        if (res.status !== 404) throw new Error("Expected 404");
    });

});
