import React, { useEffect, useState } from "react";
import { fetchPrograms } from "../api";
// Props: onEnroll - function to call when enrolling in a program
const ProgramList = ({ onEnroll }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
// Fetch programs on component mount
  useEffect(() => {
    fetchPrograms()
      .then(res => {
        if (res.success) setPrograms(res.data);
        else setErr(res.message);
      })
      // Handle errors
      .catch(() => setErr("Server error"))
      .finally(() => setLoading(false));
  }, []);
// Render loading, error, or program list
  if (loading) return <p>Loading programs...</p>;
  if (err) return <p className="text-danger">{err}</p>;
// Render the list of programs
  return (
    <div className="row mt-3">
      {programs.map(p => (
        // Render each program card
        <div key={p.programId} className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>{p.name}</h5>
            
            <p>{p.category} • {p.level}</p>
            <p><strong>₹{p.price}</strong></p>
            <button className="btn btn-primary w-100" onClick={() => onEnroll(p)}>
              Enroll
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramList;
