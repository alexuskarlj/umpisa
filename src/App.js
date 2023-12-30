import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        {/* Define other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
