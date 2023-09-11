import React from 'react';
import './styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/Routes';
import { CardDataProvider } from './components/CardDataContext';
import { EventDataProvider } from './components/EventDataContext';

const App: React.FC = () => {
  return (
    <Router>
      <EventDataProvider>
        <CardDataProvider>
          <AppRoutes />
        </CardDataProvider>
      </EventDataProvider>
    </Router>
  );
};

export default App;
