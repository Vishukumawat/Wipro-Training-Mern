const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Integration Test: validateCourseId Middleware", () => {

    it("GET /courses/abc should return 400 (invalid id)", async () => {
        const res = await request(app).get("/courses/abc");

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Invalid Course ID");
    });

});
