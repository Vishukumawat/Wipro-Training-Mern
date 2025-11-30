
// Shows list of enrolled courses

import React from 'react';

const EnrolledCourses = ({ enrolledCourses }) => {
  if (enrolledCourses.length === 0) {
    return (
      <p className="mt-3 text-muted">
        You haven&apos;t enrolled in any course yet.
      </p>
    );
  }

  return (
    <div className="mt-3">
      <h5>Your Enrolled Courses</h5>
      <ul className="list-group mt-2">
        {enrolledCourses.map((course) => (
          <li key={course.courseId} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {course.title}{' '}
              <span className="badge bg-secondary ms-2">{course.courseId}</span>
            </span>
            <span className="text-muted">₹{course.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
