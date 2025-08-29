//   src\utils\dateUtils.js
//   helper functions for date utilities

/**
 * formats a Unix timestamp into a human-readable date object
 * 
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {{date: string, time: string, full: string}}
 */
export const formatUnix = (timestamp) => {
  const date = new Date(timestamp * 1000);

  // format date part
  const dateStr = date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // format time part
  const timeStr = date.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  return {
    date: dateStr,
    time: timeStr,
    full: `${dateStr}, ${timeStr}`
  };
};
// example outputs for different users
// New York: {date: "Aug 24, 2025", time: "02:14:38 PM", full: "Aug 24, 2025, 02:14:38 PM"}
// Berlin: {date: "24.08.2025", time: "14:14:38", full: "24.08.2025, 14:14:38"}
// both valid formats

/**
 * returns the current year as a string
 * 
 * @returns {string}
 */
export const getCurrentYear = () => {
  return new Date().getFullYear().toString();
};

/**
 * calculates progress between two dates
 * returns both a float (0-1) and percent (0-100)
 * 
 * @param {string|Date} start - Start date
 * @param {string|Date} end - End date
 * @param {number} [current] - Optional current time (ms since epoch)
 * @returns {{float: number, percent: number}}
 */
export const calculateProgress = (start, end, current) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const currentTime = current || Date.now();
  
  const total = endTime - startTime;
  const elapsed = currentTime - startTime;
  
  return {
    float: elapsed / total,
    percent: Math.round((elapsed / total) * 100)
  };
};