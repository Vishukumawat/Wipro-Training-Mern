import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function BookingForm() {
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    destination: Yup.string().required("Destination is required"),
    date: Yup.date().required("Travel date required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);

    setSuccess(true);           // Show success message
    resetForm();                // Reset fields

    setTimeout(() => setSuccess(false), 3000); // Hide after 3s
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: "#0d6efd" }}>
        Book Your Travel Package
      </h2>

      {/* Success Message */}
      {success && (
        <div className="alert alert-success text-center fw-semibold">
          Booking successful!  Our team will contact you soon.
        </div>
      )}

      <Formik
        initialValues={{
          name: "",
          email: "",
          destination: "",
          date: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="shadow p-4 rounded bg-white">

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Destination */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Destination</label>
            <Field name="destination" as="select" className="form-select">
              <option value="">Choose...</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Bali">Bali</option>
              <option value="Maldives">Maldives</option>
            </Field>
            <ErrorMessage
              name="destination"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Travel Date</label>
            <Field name="date" type="date" className="form-control" />
            <ErrorMessage
              name="date"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            style={{ backgroundColor: "#0d6efd" }}
          >
            Confirm Booking
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default BookingForm;
