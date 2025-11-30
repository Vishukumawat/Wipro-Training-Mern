
// Centralized API functions

const API_BASE = '/api';

export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch courses');
  }
  return data.data;
}

// For this assignment, we hardcode userId (no auth yet)
const DEFAULT_USER_ID = 'user123';

export async function enrollInCourse(courseId, userId = DEFAULT_USER_ID) {
  const res = await fetch(`${API_BASE}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, courseId })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Enrollment failed');
  }
  return data.data;
}
