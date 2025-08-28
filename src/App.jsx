//   src\App.jsx
//   root component

import React, { useState } from 'react';
import Dashboard from './views/Dashboard.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './App.css';

function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [visibleCards, setVisibleCards] = useState({
    unix: true,
    week: true,
    leap: true,
    progress: true
  });

  const handleGreenButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (type) => {
    if (type === 'unix-time') {
      setVisibleCards(prev => ({ ...prev, unix: true }));
    }
    // Add other types as needed
    setShowOptions(false);
  };

  const handleRemoveCard = (cardType) => {
    setVisibleCards(prev => ({ ...prev, [cardType]: false }));
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>Time Insights Dashboard (v2)</h1>
            <div className="button-options-wrapper">
              <button 
                className="green-button"
                onClick={handleGreenButtonClick}
              >
                Add Card
              </button>
              {showOptions && (
                <div className="vertical-options">
                  <div 
                    className="option-text"
                    onClick={() => handleOptionClick('unix-time')}
                  >
                    Unix Time
                  </div>
                  <div 
                    className="option-text"
                    onClick={() => handleOptionClick('notes')}
                  >
                    Notes
                  </div>
                  <div 
                    className="option-text"
                    onClick={() => handleOptionClick('todo')}
                  >
                    Todo
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <Dashboard visibleCards={visibleCards} onRemoveCard={handleRemoveCard} />
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
