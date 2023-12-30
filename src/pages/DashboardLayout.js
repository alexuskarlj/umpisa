import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PostContent from '../components/PostContent';
import ConnectionContent from '../components/ConnectionContent';
import ManagePosts from '../components/ManagePosts';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard'); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if the token is not present
      navigate('/');
    }
  }, [navigate]);

  const getContentForMenuItem = () => {
    switch (activeMenuItem) {
      case 'Dashboard':
        return <PostContent />;
      case 'Manage Posts':
        return <ManagePosts />;
      case 'Connections':
        return <ConnectionContent />;

      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="dashboard">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
      <button onClick={handleLogout}>Logout</button>
      {getContentForMenuItem()} {/* Display dynamic content */}
    </div>
  );
};

export default DashboardLayout;
