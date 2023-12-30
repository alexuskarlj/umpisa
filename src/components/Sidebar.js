import React, { useState } from 'react';
import '../css/Sidebar.css';
import umpisaLogo from '../images/umpisa.png';
import postsIcon from '../images/write.png'; 
import dashboardIcon from '../images/blog.png'; 
import connectIcon from '../images/connect.png';
import userIcon from '../images/user.png';
import logoutIcon from '../images/out.png';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../components/modal/LogoutModal'; // Import the LogoutModal component

const Sidebar = ({ activeMenuItem, setActiveMenuItem }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Function to handle menu item clicks and open the logout modal when necessary
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'Logout') {
      setIsLogoutModalOpen(true);
    }
  };

  // Function to handle logout confirmation
  const handleConfirmLogout = () => {
    // Close the modal and redirect to the login page
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={umpisaLogo} alt="umpisa" />
      </div>
      <div className="menu-section">
        <h2 className="menu-title">Social</h2>
        <div
          className={`menu-item ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Dashboard')}
        >
          <img src={dashboardIcon} alt="Dashboard" className="menu-icon" />
          Dashboard
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Manage Posts' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Manage Posts')}
        >
          <img src={postsIcon} alt="Manage Posts" className="menu-icon" />
          Manage Posts
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Connections' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Connections')}
        >
          <img src={connectIcon} alt="Connections" className="menu-icon" />
          Connections
        </div>
      </div>
      <div className="menu-section">
        <h2 className="menu-title">Profile</h2>
        <div
          className={`menu-item ${activeMenuItem === 'Logout' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Logout')}
        >
          <img src={logoutIcon} alt="Logout" className="menu-icon" />
          Logout
        </div>
      </div>
      
      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={handleConfirmLogout}
      />
    </div>
  );
};

export default Sidebar;
