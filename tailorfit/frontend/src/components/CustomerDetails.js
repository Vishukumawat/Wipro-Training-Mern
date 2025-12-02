// src/components/CustomerDetails.js
// Right side panel: details + edit form toggle

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

  // jab customer change ho, form ko update karo
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

    // name/mobile/notes directly
    if (["name", "mobile", "notes"].includes(name)) {
      setFormState((prev) => ({ ...prev, [name]: value }));
    } else {
      // measurements ke andar
      setFormState((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave ko call karo, parent handle karega API
    onSave({
      name: formState.name,
      mobile: formState.mobile,
      notes: formState.notes,
      measurements: {
        // numeric fields me number convert karne ki koshish
        chest: Number(formState.measurements.chest) || undefined,
        waist: Number(formState.measurements.waist) || undefined,
        hip: Number(formState.measurements.hip) || undefined,
        shoulder: Number(formState.measurements.shoulder) || undefined,
        armLength: Number(formState.measurements.armLength) || undefined,
        legLength: Number(formState.measurements.legLength) || undefined
      }
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Customer Details</h5>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setIsEditing((prev) => !prev)}
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

      {!isEditing ? (
        // read-only view
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
            <li>Chest: {customer.measurements?.chest || "—"}</li>
            <li>Waist: {customer.measurements?.waist || "—"}</li>
            <li>Hip: {customer.measurements?.hip || "—"}</li>
            <li>Shoulder: {customer.measurements?.shoulder || "—"}</li>
            <li>Arm Length: {customer.measurements?.armLength || "—"}</li>
            <li>Leg Length: {customer.measurements?.legLength || "—"}</li>
          </ul>
        </div>
      ) : (
        // edit form
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              name="mobile"
              value={formState.mobile}
              onChange={handleChange}
              required
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
                  <label className="form-label text-capitalize">
                    {field}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name={field}
                    value={formState.measurements[field]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerDetails;
