import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/EmailFormModal.css';

// Set the root element for accessibility (required for screen readers)
Modal.setAppElement('#root');

const EmailFormModal = ({ isOpen, onRequestClose, onSave, mode, emailData }) => {
  // Define state variables for name and email
  const [name, setName] = useState(emailData?.name || '');
  const [email, setEmail] = useState(emailData?.email || '');

  // Use useEffect to update state when emailData changes
  useEffect(() => {
    if (emailData) {
      setName(emailData.name || '');
      setEmail(emailData.email || '');
    } else {
      setName('');
      setEmail('');
    }
  }, [emailData]);

  // Event handler for name input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Event handler for email input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for saving data
  const handleSave = async () => {
    try {
      // Determine the API URL based on the mode (add or update)
      const apiUrl = mode === 'add' ? 'http://localhost:8000/api/connections/' : `http://localhost:8000/api/connections/${emailData.id}/`;

      // Make a POST request to add or PUT request to update data
      const response = await fetch(apiUrl, {
        method: mode === 'add' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Parse the response data if needed
        const data = await response.json();
        onSave(data); // Call the onSave callback with the updated data
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Email Form Modal"
      className="email-form-modal"
      overlayClassName="modal-overlay"
    >
      {/* Display the modal title based on the mode */}
      <h2>{mode === 'add' ? 'Add Connection' : 'Update Connection'}</h2>
      <div className="form">
        <div className="form-group">
          <label>Name:</label>
          {/* Input field for entering name */}
          <input type="text" value={name} onChange={handleNameChange} className="email-input" />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          {/* Input field for entering email */}
          <input type="email" value={email} onChange={handleEmailChange} className="email-input" />
        </div>
      </div>
      <div className="modal-buttons">
        {/* Button for saving data */}
        <button onClick={handleSave} className="save-button">
          {mode === 'add' ? 'Add' : 'Update'}
        </button>
        {/* Button for closing the modal */}
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EmailFormModal;
