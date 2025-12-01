process.env.MONGO_URI = "mongodb://127.0.0.1:27017/fittrack_test";
// Enrollment API tests
const request = require("supertest");
const mongoose = require("mongoose");
const { expect } = require("chai");
// Import the app and models
const app = require("../app");
const Program = require("../models/Program");
const Enrollment = require("../models/Enrollment");
// Test suite for Enrollment API
describe("Enrollment API Test", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Program.deleteMany();
    await Enrollment.deleteMany();
// Create a sample program for enrollment tests
    await Program.create({
      programId: "FT001",
      name: "Test",
      category: "Yoga",
      level: "Beginner",
      price: 999
    });
  });
//  Clean up after tests
  it("should enroll successfully", async () => {
    const res = await request(app).post("/api/enroll").send({
      userId: "USR101",
      programId: "FT001"
    });

    expect(res.status).to.equal(201);
  });
  // Test duplicate enrollment handling

  it("should block duplicate enrollment", async () => {
    const res = await request(app).post("/api/enroll").send({
      userId: "USR101",
      programId: "FT001"
    });
// Expect a 400 status for duplicate enrollment
    expect(res.status).to.equal(400);
  });
});
