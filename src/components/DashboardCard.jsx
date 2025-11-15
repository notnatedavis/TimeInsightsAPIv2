//   src\components\DashboardCard.jsx
//   reusable components for Dashboard Card

import React, { useState } from 'react';
import './DashboardCard.css'
import NotesCard from '../components/NotesCard.jsx';
import TodoCard from '../components/TodoCard.jsx';
import TimerCard from '../components/TimerCard.jsx';

/**
 * DashboardCard component props
 * - title
 * - children
 * - onRemove
 */
const DashboardCard = ({ title, children, onRemove }) => {

  // controls visibility of the remove button (shown on hover)
  const [showRemove, setShowRemove] = useState(false);

  // confirm card removal (changes button appearance)
  const [confirmRemove, setConfirmRemove] = useState(false);

  /**
   * Handle click on remove button
   * - first click sets confirm state
   * - confirmation auto-cancels after 3 seconds
   */
  const handleRemoveClick = () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      // auto-cancel confirmation after 3 seconds
      setTimeout(() => setConfirmRemove(false), 3000);
      return;
    }
    
    // call onRemove if confirmed
    onRemove && onRemove();
  };

  return (
    <div 
      className="dashboard-card"
      // show remove button on mouse enter
      onMouseEnter={() => setShowRemove(true)}
      // hide remove button and cancel confirmation on mouse leave
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