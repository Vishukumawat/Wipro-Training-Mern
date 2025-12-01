import React, { useState } from "react";
import ProgramList from "./components/ProgramList";
import EnrolledPrograms from "./components/EnrolledPrograms";
import { enroll } from "./api";
// Main application component
function App() {
  const [enrolled, setEnrolled] = useState([]);
  const [msg, setMsg] = useState("");

  const handleEnroll = async (p) => {
    const res = await enroll(p.programId);
// Handle enrollment response
    if (!res.success) return setMsg(" " + res.message);

    setEnrolled([...enrolled, p]);
    setMsg(" Enrolled successfully!");
  };
// Render the main application
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">FitTrack Programs</h2>

      {msg && <p className="alert alert-info text-center">{msg}</p>}

      <ProgramList onEnroll={handleEnroll} />

      <h4 className="mt-4">Your Enrolled Programs</h4>
      <EnrolledPrograms list={enrolled} />
    </div>
  );
}

export default App;
