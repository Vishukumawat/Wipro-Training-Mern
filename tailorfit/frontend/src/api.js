// src/api.js
// All API calls in one place, using JWT token from localStorage

//  Base URL: env se aayega, warna default localhost pe
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:10000";

//  Backend ke routes
const BASE_AUTH = `${API_BASE_URL}/api/auth`;
const BASE_CUSTOMERS = `${API_BASE_URL}/api/customers`;

// Helper: get Authorization header
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    : { "Content-Type": "application/json" };
}

// Login function
export async function login(email, password) {
  const res = await fetch(`${BASE_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  // assuming backend returns { success: true, data: { token: '...' } }
  return data.data.token;
}

// Fetch customers (protected)
export async function fetchCustomers(query = "") {
  const url = query
    ? `${BASE_CUSTOMERS}?query=${encodeURIComponent(query)}`
    : BASE_CUSTOMERS;

  const res = await fetch(url, {
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch customers");
  }

  return data.data;
}

export async function createCustomer(payload) {
  const res = await fetch(BASE_CUSTOMERS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to create customer");
  }

  return data.data;
}

export async function updateCustomer(id, payload) {
  const res = await fetch(`${BASE_CUSTOMERS}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to update customer");
  }

  return data.data;
}

export async function deleteCustomer(id) {
  const res = await fetch(`${BASE_CUSTOMERS}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to delete customer");
  }

  return true;
}
