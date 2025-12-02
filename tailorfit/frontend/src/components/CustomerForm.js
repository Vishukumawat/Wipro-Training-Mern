// src/components/CustomerForm.js
// Add New Customer Form (FINAL FIXED VERSION)

import React, { useState } from "react";

const initialState = {
  name: "",
  mobile: "",
  notes: "",
  measurements: {
    chest: "",
    waist: "",
    hip: "",
    shoulder: "",
    armLength: "",
    legLength: ""
  }
};

const CustomerForm = ({ onCreate }) => {
  const [formState, setFormState] = useState(initialState);

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

    onCreate(payload);
    setFormState(initialState);
  };

  return (
    <div className="card p-3 mb-3">
      <h5 className="mb-2">Add New Customer</h5>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              name="mobile"
              required
              value={formState.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <label className="form-label">Notes</label>
            <input
              className="form-control"
              name="notes"
              value={formState.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <h6>Measurements</h6>

        <div className="row">
          {["chest", "waist", "hip", "shoulder", "armLength", "legLength"].map(
            (field) => (
              <div className="col-md-2 col-6 mb-2" key={field}>
                <label className="form-label text-capitalize">{field}</label>
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

        <button className="btn btn-success mt-2">Save Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
