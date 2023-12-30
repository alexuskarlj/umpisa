import React from 'react';
import Modal from 'react-modal';
import '../../css/LogoutModal.css';

// Set the root element for accessibility (required for screen readers)
Modal.setAppElement('#root');

const LogoutModal = ({ isOpen, onRequestClose, onConfirmLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logout Confirmation Modal"
      className="logout-modal"
      overlayClassName="modal-overlay"
    >
      <h2>Confirm Logout</h2>
      <p>Are you sure you want to log out?</p>
      <div className="modal-buttons">
        {/* Button to confirm logout */}
        <button onClick={onConfirmLogout} className="logout-button">
          Logout
        </button>
        {/* Button to cancel/logout */}
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
