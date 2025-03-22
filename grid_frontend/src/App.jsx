import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import Description from './pages/Description'; 
import SpecificInfo from './pages/SpecificInfo'; 
import ObjectDetection from './pages/ObjectDetection'; 
import Freshness from './pages/Freshness'; 

const App = () => {
  const location = useLocation(); 

  return (
    <div style={styles.app}>
      <NavBar />

      
      {location.pathname === '/' && (
        <div style={styles.content}>
          <h2 style={styles.welcome}>Welcome to Kode Kurrent</h2>
          {/* <p style={styles.subtext}>Explore the best products and offers</p> */}
        </div>
      )}

      
      <div style={styles.content}>
        <Routes>
          <Route path="/description" element={<Description />} />
          <Route path="/specific-info" element={<SpecificInfo />} />
          <Route path="/object-detection" element={<ObjectDetection />} />
          <Route path="/calculate" element={<Freshness />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  app: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f4e1d2',
   
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    backgroundColor:'#f4e1d2',
  },
  welcome: {
    fontSize: '48px',
    color: '#8a8a8a',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '20px',
    color: '#b2b2b2', 
  },
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
