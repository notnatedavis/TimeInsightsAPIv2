//   src\components\TodoCard.jsx
//   Todo card component

import React from 'react';
import DashboardCard from './DashboardCard.jsx';

/**
 * TodoCard component
 * - Basic todo functionality with placeholder content
 */
const TodoCard = ({ onRemove }) => {
  return (
    <DashboardCard 
      title="Todo List" 
      onRemove={onRemove}
    >
      <div className="todo-content">
        <div className="todo-placeholder">
            Todo feature coming soon...
        </div>
        <div className="todo-actions">
          <button className="todo-add-btn" disabled>
            + Add Task
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default TodoCard;