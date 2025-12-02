import React from "react";

const CustomerList = ({ customers, onSelect, selectedId }) => {
  if (!customers.length) {
    return <p className="text-muted">No customers found.</p>;
  }

  return (
    <ul className="list-group">
      {customers.map((c) => (
        <li
          key={c._id}
          className={
            "list-group-item d-flex justify-content-between align-items-center " +
            (selectedId === c._id ? "active" : "")
          }
          style={{ cursor: "pointer" }}
          onClick={() => onSelect(c)}
        >
          <div>
            <strong>{c.name}</strong>
            <div className="small">{c.mobile}</div>
          </div>
          <span className="badge bg-light text-dark">
            {c.measurements?.chest ? `Chest: ${c.measurements.chest}"` : "No size"}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;
