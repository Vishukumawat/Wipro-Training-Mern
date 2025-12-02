// src/components/CustomerDetails.js
// FINAL FIXED VERSION – ALL measurements show correctly

import React, { useState, useEffect } from "react";

const emptyMeasurements = {
  chest: "",
  waist: "",
  hip: "",
  shoulder: "",
  armLength: "",
  legLength: ""
};

const CustomerDetails = ({ customer, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    notes: "",
    measurements: emptyMeasurements
  });

  useEffect(() => {
    if (customer) {
      setFormState({
        name: customer.name || "",
        mobile: customer.mobile || "",
        notes: customer.notes || "",
        measurements: {
          ...emptyMeasurements,
          ...(customer.measurements || {})
        }
      });
      setIsEditing(false);
    }
  }, [customer]);

  if (!customer) {
    return <p className="text-muted">Select a customer to view details.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["name", "mobile", "notes"].includes(name)) {
      setFormState((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormState((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [name]: value
        }
      }));
    }
  };

  const convert = (val) => (val === "" ? null : Number(val));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formState.name,
      mobile: formState.mobile,
      notes: formState.notes,
      measurements: {
        chest: convert(formState.measurements.chest),
        waist: convert(formState.measurements.waist),
        hip: convert(formState.measurements.hip),
        shoulder: convert(formState.measurements.shoulder),
        armLength: convert(formState.measurements.armLength),
        legLength: convert(formState.measurements.legLength)
      }
    };

    onSave(payload);
    setIsEditing(false);
  };

  const show = (v) => (v ? v + " inch" : "—");

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Customer Details</h5>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setIsEditing((p) => !p)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete()}
          >
            Delete
          </button>
        </div>
      </div>

      {/* VIEW MODE */}
      {!isEditing ? (
        <div>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Mobile:</strong> {customer.mobile}
          </p>
          <p>
            <strong>Notes:</strong> {customer.notes || "—"}
          </p>

          <h6>Measurements</h6>
          <ul className="list-unstyled">
            <li>Chest: {show(customer.measurements?.chest)}</li>
            <li>Waist: {show(customer.measurements?.waist)}</li>
            <li>Hip: {show(customer.measurements?.hip)}</li>
            <li>Shoulder: {show(customer.measurements?.shoulder)}</li>
            <li>Arm Length: {show(customer.measurements?.armLength)}</li>
            <li>Leg Length: {show(customer.measurements?.legLength)}</li>
          </ul>
        </div>
      ) : (
        /* EDIT MODE */
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              name="mobile"
              value={formState.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              name="notes"
              value={formState.notes}
              onChange={handleChange}
            />
          </div>

          <h6>Measurements</h6>

          <div className="row">
            {["chest", "waist", "hip", "shoulder", "armLength", "legLength"].map(
              (field) => (
                <div className="col-6 mb-2" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    type="number"
                    className="form-control"
                    name={field}
                    value={formState.measurements[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>

          <button className="btn btn-primary mt-2">Save</button>
        </form>
      )}
    </div>
  );
};

export default CustomerDetails;
