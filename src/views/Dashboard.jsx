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

const Dashboard = () => {
  const [timeData, setTimeData] = useState({
    unixTime: null,
    week: null,
    isLeapYear: null,
    progress: null,
    loading: true,
    error: null
  });

  const currentYear = getCurrentYear();

  // API testing function - for debugging only
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

  // debug console logs (temporary)
  console.log('Render state: ', timeData);

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

  // format Unix time
  const formattedTime = timeData.unixTime ? formatUnix(timeData.unixTime) : null;
  
  return (
    <div className="dashboard-grid"> 
      
      <DashboardCard title="Current Unix Time"> 
        {formattedTime ? ( 
          // conditional rendering of Unix Time
          // current format...
          // "{month} {day#}, {year}" n/
          // "HH:MM:SS {"AM"}/{"PM"}"
          <>
            <div className="unix-time">
              <div className="date-part">{formattedTime.date}</div>
              <div className="time-part">{formattedTime.time}</div>
            </div>
          </>
          // <div className="timestamp">{timeData.unixTime}</div>
          // ^ moved just because not needed
        ) : (
          <div className="loading-data">Loading...</div>
        )}
      </DashboardCard>

      <DashboardCard title="Week Number">
        {timeData.week !== null && timeData.week !== undefined ? ( 
          // conditional rendering of Week Number
          <>
            <div className="week-number">{timeData.week}/52</div>
            <div>ISO Week</div>
          </>
        ) : (
          <div className="loading-data">Loading...</div>
        )}
      </DashboardCard>

      <DashboardCard title="Leap Year">
        {timeData.isLeapYear !== null && timeData.isLeapYear !== undefined ? (
          // conditional rendering of Leap Year
          <>
            <div className={`leap-year ${timeData.isLeapYear ? 'leap-yes' : 'leap-no'}`}>
              {timeData.isLeapYear ? 'Yes' : 'No'}
            </div>
            <div>{currentYear}</div>
          </>
        ) : (
          <div className="loading-data">Loading...</div>
        )}
      </DashboardCard>

      <DashboardCard title="Year Progress">
        {timeData.progress ? (
          // conditional rendering of Year Progress
          <>
            <ProgressRing percent={timeData.progress.percent || 0} />
            <div className="progress-text">
              {timeData.progress.percent || 0}% complete
            </div>
          </>
        ) : (
          <div className="loading-data">Loading...</div>
        )}
      </DashboardCard>
    </div>

    // include more conditional rendering cards

    // implement (time till birthday , )
  );
};

// critical - must keep to allow importing in other files
export default Dashboard;