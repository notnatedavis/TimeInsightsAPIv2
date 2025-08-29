//   src\services\digidates.js
//   API service layer
//   (https://digidates.de/)

const API_BASE = 'https://digidates.de/api/v1';

/**
 * Handles fetch responses
 * throws an error if response is not OK, else return parsed JSON data
 * 
 * @param {Response} response - fetch response object
 * @returns {Promise<Object>} - parsed JSON data / error
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API error: ${response.status}`);
  }
  return response.json();
};

/**
 * gets current Unix time from API
 * 
 * @returns {Promise<number>} - Unix time value
 */
export const getUnixTime = async () => {
  const response = await fetch(`${API_BASE}/unixtime`);
  const data = await handleResponse(response);
  return data.time; // extract time value
};

/**
 * gets ISO week number for a given date
 * 
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {Promise<number>} - Week number
 */
export const getWeek = async (date) => {
  const response = await fetch(`${API_BASE}/week?date=${date}`);
  const data = await handleResponse(response);
  return data.week; // extract week value
};

/**
 * checks if a given year is a leap year
 * 
 * @param {number|string} year - Year to check
 * @returns {Promise<boolean>} - True if leap year
 */
export const getLeapYear = async (year) => {
  const response = await fetch(`${API_BASE}/leapyear?year=${year}`);
  const data = await handleResponse(response);
  return data.leapyear; // extract leap value
};

/**
 * gets progress between two dates
 * 
 * @param {string} start - Start date (YYYY-MM-DD)
 * @param {string} end - End date (YYYY-MM-DD)
 * @returns {Promise<Object>} - Progress data
 */
export const getProgress = async (start, end) => {
  const response = await fetch(
    `${API_BASE}/progress?start=${start}&end=${end}`
  );
  return handleResponse(response);
};

// additional API functions for future use

/**
 * gets countdown to a specific date.
 * 
 * @param {string} date - Target date (YYYY-MM-DD)
 * @returns {Promise<Object>} - Countdown data
 */
export const getCountdownDate = async (date) => {
  const response = await fetch(`${API_BASE}/countdown/${date}`);
  return handleResponse(response);
};

/**
 * gets age from a birth date
 * 
 * @param {string} date - Birth date (YYYY-MM-DD)
 * @returns {Promise<Object>} - Age data
 */
export const getAge = async (date) => {
  const response = await fetch(`${API_BASE}/age/${date}`);
  return handleResponse(response);
};