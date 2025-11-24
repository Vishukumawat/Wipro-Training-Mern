const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Integration Test: /courses Rendering", () => {

    it("GET /courses should render EJS page", async () => {
        const res = await request(app).get("/courses");

        expect(res.status).to.equal(200);
        expect(res.text).to.include("<h1>SkillSphere LMS Courses</h1>");
    });

});
