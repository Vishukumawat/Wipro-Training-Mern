// Import SuperTest to simulate HTTP requests against the Express application
const request = require("supertest");

// Import the Express app instance (exported from index.js)
const app = require("../index");

// Test suite for all /courses API endpoints
describe("Courses API", () => {

    // Test 1: Verify that the /courses route responds with HTTP 200
    it("GET /courses should return 200", async () => {

        // Make a GET request to the /courses endpoint
        const res = await request(app).get("/courses");

        // Manually assert that the status code is 200 (OK)
        if (res.status !== 200) throw new Error("Expected 200");
    });

    // Test 2: Verify that a valid course ID returns a course object
    it("GET /courses/1 should return course object", async () => {

        // Make a GET request to /courses/1
        const res = await request(app).get("/courses/1");

        // Check whether the response contains a "name" property
        if (!res.body.name) throw new Error("Course name missing");
    });

    // Test 3: Ensure API returns 404 for non-existing course IDs
    it("GET /courses/999 should return 404", async () => {

        // Attempt to fetch a course that does not exist (ID = 999)
        const res = await request(app).get("/courses/999");

        // Assert the response status is 404 (Not Found)
        if (res.status !== 404) throw new Error("Expected 404");
    });

});
