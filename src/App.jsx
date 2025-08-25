//   src\App.jsx
//   root component

import React from 'react';
import Dashboard from './views/Dashboard.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './App.css';

function App() {
  const handleGreenButtonClick = () => {
    // example functionality - could be used for theme switching or other actions
    console.log('Green button clicked!');
    alert('Green button functionality can be implemented here!');
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>Time Insights Dashboard (v2)</h1>
            <button 
              className="green-button"
              onClick={handleGreenButtonClick}
            >
              Add (update)
            </button>
          </div>
        </header>
        <main>
          <Dashboard />
        </main>
        <footer className="app-footer">
          <p>Open source data from DigiDates.de API</p>
          <p>@notenatedavis on github</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

// critical - must keep to allow importing in other files
export default App;