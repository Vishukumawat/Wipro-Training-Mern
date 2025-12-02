// src/App.js
// Handles login state + shows either Login screen or CRM dashboard

import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import {
  login as loginApi,
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "./api";
import CustomerForm from "./components/CustomerForm";
import CustomerSearch from "./components/CustomerSearch";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load customers when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCustomers();
    }
  }, [isAuthenticated]);

  const loadCustomers = async (query = "") => {
    try {
      setLoading(true);
      const list = await fetchCustomers(query);
      setCustomers(list);
      if (selectedCustomer) {
        const stillExists = list.find((c) => c._id === selectedCustomer._id);
        if (!stillExists) setSelectedCustomer(null);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoginError("");
      const token = await loginApi(email, password);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setMessage("Login successful");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCustomers([]);
    setSelectedCustomer(null);
    setMessage("");
  };

  const handleSearch = (term) => {
    loadCustomers(term);
  };

  const handleCreate = async (payload) => {
    try {
      await createCustomer(payload);
      setMessage("Customer created successfully");
      loadCustomers();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleUpdate = async (payload) => {
    if (!selectedCustomer) return;
    try {
      const updated = await updateCustomer(selectedCustomer._id, payload);
      setMessage("Customer updated successfully");
      setCustomers((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
      setSelectedCustomer(updated);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }
    try {
      await deleteCustomer(selectedCustomer._id);
      setMessage("Customer deleted");
      setCustomers((prev) =>
        prev.filter((c) => c._id !== selectedCustomer._id)
      );
      setSelectedCustomer(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="mb-0">TailorFit CRM</h2>
          <small className="text-muted">
            Manage customers & measurements (Admin logged in)
          </small>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && (
        <div className="alert alert-info py-2" role="alert">
          {message}
        </div>
      )}

      <CustomerForm onCreate={handleCreate} />

      <CustomerSearch onSearch={handleSearch} />

      {loading && <p>Loading customers...</p>}

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <h5>Customers ({customers.length})</h5>
          <CustomerList
            customers={customers}
            onSelect={setSelectedCustomer}
            selectedId={selectedCustomer?._id}
          />
        </div>
        <div className="col-md-8">
          <CustomerDetails
            customer={selectedCustomer}
            onSave={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
