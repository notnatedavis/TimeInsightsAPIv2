//   src\components\TimerCard.jsx
//   Timer card component

import React from 'react';
import DashboardCard from './DashboardCard.jsx';

/**
 * TimerCard component
 * - Basic timer functionality with placeholder content
 */
const TimerCard = ({ onRemove }) => {
  return (
    <DashboardCard 
      title="Timer" 
      onRemove={onRemove}
    >
      <div className="timer-content">
        <div className="timer-placeholder">
            Timer feature coming soon...
        </div>
        <div className="timer-display">
            00:00:00
        </div>
        <div className="timer-actions">
          <button className="timer-start-btn" disabled>
            Start
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default TimerCard;