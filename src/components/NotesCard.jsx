//   src\components\NotesCard.jsx
//   Notes card component

import React from 'react';
import DashboardCard from './DashboardCard.jsx';

/**
 * NotesCard component
 * - Basic notes functionality with placeholder content
 */
const NotesCard = ({ onRemove }) => {
  return (
    <DashboardCard 
      title="Notes" 
      onRemove={onRemove}
    >
      <div className="notes-content">
        <div className="notes-placeholder">
            Notes feature coming soon...
        </div>
        <div className="notes-actions">
          <button className="notes-add-btn" disabled>
            + Add Note
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default NotesCard;