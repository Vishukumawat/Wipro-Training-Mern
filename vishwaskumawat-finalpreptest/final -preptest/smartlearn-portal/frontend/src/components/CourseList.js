
// Displays course catalog with "Enroll Now" buttons

import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../api';

const CourseList = ({ onEnrollClick }) => {
  const [courses, setCourses] = useState([]);
  
  const [loading, setLoading] = useState(true);   // loading state
  const [error, setError] = useState(null);       // error state

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading courses...</p>;
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        {error}
      </div>
    );
  }

  if (courses.length === 0) {
    return <p className="mt-4 text-center">No courses available.</p>;
  }

  return (
    <div className="row g-3 mt-3">
      {courses.map(course => (
        <div key={course._id} className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text text-muted mb-1">
                Category: <strong>{course.category}</strong>
              </p>
              <p className="card-text mb-3">
                Price: <strong>₹{course.price}</strong>
              </p>
              <button
                className="btn btn-primary mt-auto"
                onClick={() => onEnrollClick(course)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
