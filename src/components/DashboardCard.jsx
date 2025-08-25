//   src\components\DashboardCard.jsx
//   reusable components for Dashboard Card

import React, { useState } from 'react';
import './DashboardCard.css'

const DashboardCard = ({ title, children, onRemove }) => {
  const [showRemove, setShowRemove] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemoveClick = () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      // auto-cancel confirmation after 3 seconds
      setTimeout(() => setConfirmRemove(false), 3000);
      return;
    }
    
    onRemove && onRemove();
  };

  return (
    <div 
      className="dashboard-card"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => {
        setShowRemove(false);
        setConfirmRemove(false);
      }}
    >
      <div className="card-header">
        <h3>{title}</h3>
        {onRemove && (
          <div className={`remove-card-btn ${showRemove ? 'visible' : ''}`}>
            <button 
              className={confirmRemove ? 'confirm' : ''}
              onClick={handleRemoveClick}
              aria-label={confirmRemove ? "Confirm removal" : "Remove card"}
            >
              {confirmRemove ? '✓' : '×'}
            </button>
          </div>
        )}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// critical - must keep to allow importing in other files
export default DashboardCard;