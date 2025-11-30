

process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/smartlearn_test';

const mongoose = require('mongoose');
const request = require('supertest');
const { expect } = require('chai');

const connectDB = require('../config/db');
const app = require('../app');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

describe('Enrollment API', () => {
  before(async () => {
    await connectDB();
    // Clear collections before tests
    await Course.deleteMany({});
    await Enrollment.deleteMany({});

    // Create a test course
    await Course.create({
      courseId: 'C101',
      title: 'MERN Fundamentals',
      category: 'Web Development',
      price: 499
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return 201 on successful enrollment', async () => {
    const res = await request(app)
      .post('/api/enroll')
      .send({
        userId: 'user1',
        courseId: 'C101'
      });

    expect(res.status).to.equal(201);
    expect(res.body.success).to.be.true;
    expect(res.body.message).to.equal('Enrollment successful');
  });

  it('should return 400 on duplicate enrollment', async () => {
    // Same user + same course again
    const res = await request(app)
      .post('/api/enroll')
      .send({
        userId: 'user1',
        courseId: 'C101'
      });

    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.satisfy(msg =>
      msg.includes('already enrolled') || msg.includes('Duplicate enrollment')
    );
  });
});
