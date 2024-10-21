import { useState, useEffect } from 'react';
import axios from 'axios';
import NewMessage from './NewMessage';

export default function Messages({ setActiveComponent, currentAdminId }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [activeRecipient, setActiveRecipient] = useState(null);

  // Fetch admins on component load
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  // Fetch employees on component load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch and filter messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/messages');
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender._id === currentAdminId &&
              msg.senderModel === 'Admin') ||
            (msg.recipient._id === currentAdminId &&
              msg.recipientModel === 'Admin')
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentAdminId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeRecipient) {
      console.error('Message content and recipient must be provided');
      return;
    }

    const messageData = {
      sender: { _id: currentAdminId },
      recipient: { _id: activeRecipient._id },
      senderModel: 'Admin',
      recipientModel: activeRecipient.model,
      messageContent: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/messages',
        messageData
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleRecipientSelect = (recipient) => {
    setActiveRecipient(recipient);
  };

  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="d-flex align-items-center">
            <a
              href="#"
              className="icon-md me-2 px-2"
              onClick={() => setActiveComponent('ViewMessages')}
            >
              <i className="social-icon fa-solid fa-comments"></i>
            </a>

            <NewMessage
              currentAdminId={currentAdminId}
              employees={employees}
              admins={admins}
              onRecipientSelect={handleRecipientSelect}
            />
          </div>

          <div className="chat-conversation-content custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center small my-2">No messages yet</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`d-flex mb-1 ${
                    msg.sender._id === currentAdminId
                      ? 'justify-content-end'
                      : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 avatar avatar-xs me-2 ${
                      msg.sender._id === currentAdminId ? 'd-none' : ''
                    }`}
                  >
                    <img
                      src={msg.sender.image || ''}
                      alt=""
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="w-100">
                      <div className="d-flex flex-column">
                        <h6 className="mt-1">{msg.sender.name}</h6>
                        <div
                          className={`bg-${
                            msg.sender._id === currentAdminId
                              ? 'light text-grey'
                              : 'light text-secondary'
                          } p-2 px-3 rounded-2`}
                        >
                          {msg.messageContent}
                        </div>
                        <div className="small my-2">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form
            className="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
///
{
  /*
import { useEffect, useState } from 'react';

export default function NewMessage({
  currentAdminId,
  employees = [],
  admins = [],
  onRecipientSelect,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track loading state

  // Load employees/admins, and only then read from localStorage
  useEffect(() => {
    if (employees.length > 0 || admins.length > 0) {
      const storedRecipientId = localStorage.getItem('selectedRecipientId');
      console.log('Stored Recipient ID:', storedRecipientId);

      if (storedRecipientId) {
        const selectedRecipient =
          employees.find((emp) => emp._id === storedRecipientId) ||
          admins.find((admin) => admin._id === storedRecipientId);

        if (selectedRecipient) {
          console.log('Selected Recipient Found:', selectedRecipient);
          setSelectedId(storedRecipientId);
          const recipientModel = storedRecipientId.startsWith('66')
            ? 'Admin'
            : 'Employee';
          onRecipientSelect({ ...selectedRecipient, model: recipientModel });
        }
      }

      setIsDataLoaded(true); // Mark data as loaded
    }
  }, [employees, admins]);

  const handleRecipientChange = (e) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);
    localStorage.setItem('selectedRecipientId', selectedId);

    const selectedRecipient =
      employees.find((emp) => emp._id === selectedId) ||
      admins.find((admin) => admin._id === selectedId);

    if (selectedRecipient) {
      const recipientModel = selectedId.startsWith('66') ? 'Admin' : 'Employee';
      onRecipientSelect({ ...selectedRecipient, model: recipientModel });
    }
  };

  if (!isDataLoaded) {
    return <div>Loading contacts...</div>; // Prevent rendering until data is ready
  }

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">To</span>
        <select
          className="form-select"
          onChange={handleRecipientChange}
          value={selectedId}
        >
          <option value="">Contacts</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
          {admins.map((admin) => (
            <option key={admin._id} value={admin._id}>
              {admin.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
*/
}
