import React, { useState, useEffect } from 'react';
import '../css/ConnectionContent.css';
import EmailFormModal from './modal/EmailFormModal';

const ConnectionsContent = () => {
  // State variables for managing the modal and connections data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [connectionToUpdate, setConnectionToUpdate] = useState(null);
  const [connections, setConnections] = useState([]);

  // Function to fetch connections from the API
  const fetchConnections = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/connections/');
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  // Use useEffect to fetch connections data when the component mounts
  useEffect(() => {
    fetchConnections();
  }, []);

  // Function to open the modal for adding or updating connections
  const openModal = (mode, connectionData) => {
    setModalMode(mode);
    setConnectionToUpdate(connectionData);
    setIsModalOpen(true);
  };

  // Function to handle the click event for removing a connection
  const handleRemoveClick = async (connectionData) => {
    try {
      // Make a DELETE request to remove the connection
      await fetch(`http://localhost:8000/api/connections/${connectionData.id}/`, {
        method: 'DELETE',
      });

      // Refresh the connections data
      fetchConnections();
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  // Function to handle the click event for updating a connection
  const handleUpdateClick = (connectionData) => {
    openModal('update', connectionData);
  };

  return (
    <div className="connections-content">
      <h1>Connections</h1>
      <button className="connections-add-button" onClick={() => openModal('add', null)}>
        Add Connection
      </button>
      <div className="connections-table">
        <div className="connections-row header">
          <div className="connections-cell">Name</div>
          <div className="connections-cell">Email Address</div>
          <div className="connections-cell">Options</div>
        </div>
        {connections.map((connection) => (
          <div key={connection.id} className="connections-row">
            <div className="connections-cell">{connection.name}</div>
            <div className="connections-cell">{connection.email}</div>
            <div className="connections-cell">
              <div className="connections-button-container">
                <button
                  className="connections-update-button"
                  onClick={() => handleUpdateClick(connection)}
                >
                  Update
                </button>
                <button
                  className="connections-remove-button"
                  onClick={() => handleRemoveClick(connection)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <EmailFormModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          mode={modalMode}
          onSave={() => {
            // Modal onSave callback, no need to do anything here
            setIsModalOpen(false);
            // Refresh the connections data after a successful operation
            fetchConnections();
          }}
          emailData={connectionToUpdate}
        />
      )}
    </div>
  );
};

export default ConnectionsContent;
