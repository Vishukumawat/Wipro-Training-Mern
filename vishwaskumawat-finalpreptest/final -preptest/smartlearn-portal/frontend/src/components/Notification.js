
// Simple notification/alert using Bootstrap styles

import React from 'react';

const Notification = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const alertClass = {
    success: 'alert-success',
    error: 'alert-danger',
    info: 'alert-info',
    warning: 'alert-warning'
  }[type] || 'alert-info';

  return (
    <div className={`alert ${alertClass} d-flex justify-content-between align-items-center`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
};

export default Notification;
