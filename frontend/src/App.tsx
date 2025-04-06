import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateReservationPage from './pages/CreateReservationPage';
import FilterReservationsPage from './pages/FilterReservationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateReservationPage />} />
        <Route path="/filter" element={<FilterReservationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
