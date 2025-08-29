//   src\components\ProgressRing.jsx
//   reusable components for Progress Ring

import './ProgressRing.css'

/**
 * ProgressRing component
 * - percent: (0-100) - the completion percentage to display
 * 
 * renders a circular progress ring using SVG
 * filled portion of ring corresponds to percent value
 */
const ProgressRing = ({ percent }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percent / 100);
  
  return (
    <svg viewBox="0 0 100 100">
      
      {/* Background ring */}
      <circle
        className="ring-bg"
        cx="50"
        cy="50"
        r={radius}
      />

      {/* Progress ring */}
      <circle
        className="ring-progress"
        cx="50"
        cy="50"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        
      />
    </svg>
  );
};

// critical - must keep to allow importing in other files
export default ProgressRing; 