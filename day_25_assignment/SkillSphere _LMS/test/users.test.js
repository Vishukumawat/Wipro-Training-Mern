
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

// Integration testing for /users API
describe("Integration Test: /users API", () => {

    it("POST /users should return success response", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "Vishwas",
                email: "vishwas@example.com"
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "User created successfully");
        expect(res.body.data).to.have.property("name", "Vishwas");
    });

    it("POST /users should accept any JSON body", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                city: "Ujjain",
                role: "Student"
            });

        expect(res.status).to.equal(200);
        expect(res.body.data.role).to.equal("Student");
    });

});
