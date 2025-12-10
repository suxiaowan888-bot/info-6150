import React, { createContext, useContext, useState, useMemo } from 'react';

// read and write
const ThemeReadContext = createContext(null);
const ThemeDispatchContext = createContext(null);

// Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: 'light',
    color: '#3b82f6'
  });
  
  // useMemo
  const themeValue = useMemo(() => theme, [theme.mode, theme.color]);
  const setThemeValue = useMemo(() => setTheme, []);
  
  return (
    <ThemeReadContext.Provider value={themeValue}>
      <ThemeDispatchContext.Provider value={setThemeValue}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeReadContext.Provider>
  );
}


function useTheme() {
  return useContext(ThemeReadContext);
}

function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}


const ThemeDisplay = React.memo(() => {
  const theme = useTheme();
  console.log('ThemeDisplay rendered');
  
  return (
    <div style={{
      padding: '16px',
      border: `2px solid ${theme.color}`,
      borderRadius: '8px'
    }}>
      <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Current Theme:</h3>
      <p>Mode: {theme.mode}</p>
      <p>Color: {theme.color}</p>
    </div>
  );
});

// Component that only modifies theme
const ThemeControls = React.memo(() => {
  const setTheme = useThemeDispatch();
  console.log('ThemeControls rendered');
  
  const handleToggle = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <button
        onClick={handleToggle}
        style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Toggle Light/Dark
      </button>
    </div>
  );
});

// Main app
export default function ExerciseA() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

function Content() {
  const theme = useTheme();
  
  const bgColor = theme.mode === 'light' ? '#ffffff' : '#1f2937';
  const textColor = theme.mode === 'light' ? '#000000' : '#ffffff';
  
  return (
    <div style={{
      minHeight: '100vh',
      padding: '32px',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '32px' }}>
        Exercise A - Theme Manager
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '1024px'
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Control Panel
          </h2>
          <ThemeControls />
        </div>
        
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Display Area
          </h2>
          <ThemeDisplay />
        </div>
      </div>
    </div>
  );
}
