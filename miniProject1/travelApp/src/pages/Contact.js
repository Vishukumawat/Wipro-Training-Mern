import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    // Show success message
    setSuccess(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });

    // Hide success message after 3 sec
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-center fw-bold mb-4" style={{ color: "#0d6efd" }}>
        Contact Us
      </h2>

      {success && (
        <div className="alert alert-success text-center fw-semibold">
          Message sent successfully! 🎉
        </div>
      )}

      <form className="shadow p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Message</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Write your message..."
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fw-semibold"
          style={{ backgroundColor: "#0d6efd" }}
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
