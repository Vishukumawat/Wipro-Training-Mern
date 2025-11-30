
//  manages enrollment state and notifications

import React, { useState } from 'react';
import CourseList from './components/CourseList';
import EnrolledCourses from './components/EnrolledCourses';
import Notification from './components/Notification';
import { enrollInCourse } from './api';

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle enroll click from CourseList
  const handleEnrollClick = async (course) => {
    try {
      setIsSubmitting(true);
      setNotification({ type: '', message: '' });

      // Call backend
      await enrollInCourse(course.courseId);

      // Update local state if not already enrolled
      const already = enrolledCourses.some(
        (c) => c.courseId === course.courseId
      );
      if (!already) {
        setEnrolledCourses([...enrolledCourses, course]);
      }

      setNotification({
        type: 'success',
        message: `Enrolled successfully in "${course.title}".`
      });
    } catch (err) {
      const msg = err.message || 'Enrollment failed';

      // Detect duplicate enrollment message
      const isDuplicate =
        msg.toLowerCase().includes('already enrolled') ||
        msg.toLowerCase().includes('duplicate');

      setNotification({
        type: isDuplicate ? 'warning' : 'error',
        message: msg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-center">SmartLearn Course Portal</h1>
        <p className="text-center text-muted mb-0">
          Browse courses, enroll, and track your learning.
        </p>
      </header>

      <div className="row">
        <div className="col-12 mb-3">
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification({ type: '', message: '' })}
          />
        </div>

        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>Available Courses</h4>
            {isSubmitting && (
              <span className="badge bg-info">
                Processing enrollment...
              </span>
            )}
          </div>
          <CourseList onEnrollClick={handleEnrollClick} />
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <EnrolledCourses enrolledCourses={enrolledCourses} />
        </div>
      </div>
    </div>
  );
}

export default App;
