
// Component to display the list of enrolled programs

import React from "react";
// Props: list - array of enrolled program objects
const EnrolledPrograms = ({ list }) => {
  if (list.length === 0)
    return <p className="text-muted mt-2">No enrolled programs yet.</p>;
// Render the list of enrolled programs
  return (
    <ul className="list-group mt-2">
      {list.map(p => (
        <li key={p.programId} className="list-group-item">
          {p.name} ({p.level})
        </li>
      ))}
    </ul>
  );
};

export default EnrolledPrograms;
