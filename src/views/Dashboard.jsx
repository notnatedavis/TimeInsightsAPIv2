//   src\views\Dashboard.jsx
//   main views

import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import { 
  getUnixTime, 
  getWeek, 
  getLeapYear,
  getProgress 
} from '../services/digidates';
import { formatUnix, getCurrentYear } from '../utils/dateUtils';
import './Dashboard.css';

const Dashboard = ({ visibleCards, onRemoveCard }) => {
  const [timeData, setTimeData] = useState({
    unixTime: null,
    week: null,
    isLeapYear: null,
    progress: null,
    loading: true,
    error: null
  });

  const currentYear = getCurrentYear();

  // API testing  function - for debugging only
  const testAPIs = async () => {
    console.log('Testing APIs directly...');
    
    try {
      const testUnix = await fetch('https://digidates.de/api/v1/unixtime');
      const testUnixData = await testUnix.json();
      console.log('Unix Time API response:', testUnixData);
      
      const testWeek = await fetch(`https://digidates.de/api/v1/week?date=${new Date().toISOString().split('T')[0]}`);
      const testWeekData = await testWeek.json();
      console.log('Week API response:', testWeekData);
      
      const testLeap = await fetch(`https://digidates.de/api/v1/leapyear?year=${currentYear}`);
      const testLeapData = await testLeap.json();
      console.log('Leap Year API response:', testLeapData);

      // Test the service function directly
      const serviceLeap = await getLeapYear(currentYear);
      console.log('Service function result:', serviceLeap);
    } catch (error) {
      console.error('Direct API test failed:', error);
    }
  };

  useEffect(() => {
    // call API test function once component mounts
    testAPIs();
    
    const fetchData = async () => {
      setTimeData(prev => ({ ...prev, loading: true }));
      
      try {
        const [unixTimeResponse, weekResponse, leapYearResponse, progressResponse] = await Promise.all([
          
          // graceful API error coverage

          getUnixTime().catch(error => {
            console.error('UnixTime API error:', error);
            return null;
          }),

          getWeek(new Date().toISOString().split('T')[0]).catch(error => {
            console.error('Week API error:', error);
            return null;
          }),

          getLeapYear(currentYear).catch(error => {
            console.error('LeapYear API error:', error);
            return null;
          }),

          getProgress(`${currentYear}-01-01`, `${currentYear}-12-31`).catch(error => {
            console.error('Progress API error:', error);
            return null;
          })
        ]);

        // debug console logs (temporary)
        console.log('API response:', { 
          unixTime: unixTimeResponse, 
          week: weekResponse, 
          isLeapYear: leapYearResponse, 
          progress: progressResponse 
        });

        // handle progress API response
        setTimeData({
          unixTime: unixTimeResponse,
          week: weekResponse,
          isLeapYear: leapYearResponse,
          progress: progressResponse,
          loading: false,
          error: null
        });
      } catch (error) {
        setTimeData({
          unixTime: null,
          week: null,
          isLeapYear: null,
          progress: null,
          loading: false,
          error: 'Failed to load time data.'
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // setInterval(data refresh time here)

    return () => clearInterval(interval);
  }, [currentYear]);


  // check if any cards are hidden
  const anyCardsHidden = Object.values(visibleCards).some(visible => !visible);

  // debug console logs (temporary)
  console.log('Render state: ', timeData);

  // format Unix time
  const formattedTime = timeData.unixTime ? formatUnix(timeData.unixTime) : null;

  // loading skeleton
  if (timeData.loading) {
    return (
      <div className="dashboard-grid">
        {[...Array(4)].map((_, i) => ( // UPDATE (make # of cards const / called)
          <DashboardCard key={i} title="Loading...">
            <div className="skeleton-loader" />
          </DashboardCard>
        ))}
      </div>
    );
  }

  // error state
  if (timeData.error) {
    return (
      <div className="error-state">
        <div>⚠️</div>
        <p>{timeData.error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  
  return (
    <>
      <div className="dashboard-grid"> 
        {visibleCards.intro && (
          // visibleCard 1. Intro Card
          <DashboardCard 
            title="Welcome !" 
            onRemove={() => onRemoveCard('intro')} // update 
          > 
            <>
              <p>This dashboard provides a multitude of cards with a variety of uses. Explore by using the "Add Card" button to customize your Dashboard by adding or removing cards as needed.</p>
              <a href="https://github.com/notnatedavis/TimeInsightsAPIv2/tree/main?tab=readme-ov-file#features" target="_blank" rel="noopener noreferrer">
                Features
              </a>
            </>
          </DashboardCard>
        )}
        {visibleCards.unix && (
          // visibleCard 2. Unix Current Time + Week + Leap + Year
          <DashboardCard 
            title="Current Unix Time" 
            onRemove={() => onRemoveCard('unix')}
          > 
            {formattedTime ? ( 
              <>
                <div className="unix">
                  <div className="date-part">{formattedTime.date}</div>
                  <div className="time-part">{formattedTime.time}</div>
                </div>
              </>
            ) : (
              <div className="loading-data">Loading...</div>
            )}
          </DashboardCard>
        )}
        {visibleCards.timer && (
          // visibleCard 3. Timer
          <DashboardCard 
            title="Timer" 
            onRemove={() => onRemoveCard('timer')} // update 
          > 
          </DashboardCard>
        )}
        {visibleCards.notes && (
          // visibleCard 4. Notes
          <DashboardCard 
            title="Notes" 
            onRemove={() => onRemoveCard('notes')} // update 
          > 
          </DashboardCard>
        )}
      </div>
    </>
  );
};

export default Dashboard;
