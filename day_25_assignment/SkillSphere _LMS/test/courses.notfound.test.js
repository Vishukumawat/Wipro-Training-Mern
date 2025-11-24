const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Integration Test: Course Not Found", () => {

    it("GET /courses/999 should return 404", async () => {
        const res = await request(app).get("/courses/999");

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "Course not found");
    });

});
