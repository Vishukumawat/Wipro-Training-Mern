const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Integration Test: Home Route", () => {

    it("GET /home should return welcome message", async () => {
        const res = await request(app).get("/home");

        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Welcome to SkillSphere LMS API");
    });

});
