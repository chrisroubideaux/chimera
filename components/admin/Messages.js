import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './NewMessage';

export default function Messages({ setActiveComponent, currentAdminId }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [activeRecipient, setActiveRecipient] = useState(null);

  // Fetch employees and admins on component load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const [adminsRes, employeesRes] = await Promise.all([
          axios.get('http://localhost:3001/admins'),
          axios.get('http://localhost:3001/employees'),
        ]);
        setAdmins(adminsRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Fetch messages when the recipient changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeRecipient) return; // Prevent fetching if no recipient selected

      try {
        const response = await axios.get('http://localhost:3001/messages');
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender._id === currentAdminId &&
              msg.recipient._id === activeRecipient._id) ||
            (msg.sender._id === activeRecipient._id &&
              msg.recipient._id === currentAdminId)
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentAdminId, activeRecipient]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeRecipient) {
      console.error('Message content and recipient must be provided');
      return;
    }

    const messageData = {
      sender: { _id: currentAdminId },
      recipient: { _id: activeRecipient._id },
      senderModel: 'Admin', // Adjust this if using employee roles
      recipientModel: activeRecipient.role === 'Admin' ? 'Admin' : 'Employee',
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
    setActiveRecipient(recipient); // Update active recipient
    setMessages([]); // Clear previous messages
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (isYesterday) {
      return `Yesterday, ${messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else {
      return messageDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0">
              <div className="flex-shrink-0 avatar me-2">
                <Image
                  src={activeRecipient?.image || ''}
                  alt={activeRecipient?.name || 'Recipient Avatar'}
                  className="avatar-img rounded-circle"
                  width={40}
                  height={40}
                />
              </div>
              <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">
                  {activeRecipient ? activeRecipient.name : 'Recipient Name'}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <a
                href="#"
                className="icon-md me-2 px-2"
                onClick={() => setActiveComponent('ViewMessages')}
              >
                <i className="social-icon fa-solid fa-comments"></i>
              </a>
              <a href="#!" className="icon-md me-2 px-2">
                <i className="social-icon fa-solid fa-video"></i>
              </a>
              <NewMessage
                currentAdminId={currentAdminId}
                employees={employees}
                admins={admins}
                onRecipientSelect={handleRecipientSelect}
              />
              <div className="dropdown">
                <a
                  className="icon-md rounded-circle me-2 px-2"
                  href="#"
                  id="chatcoversationDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="social-icon fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end w-75">
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className=" fs-6 social-icon fa-solid fa-check me-2"></i>
                      Mark as read
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className=" fs-6 social-icon fa-solid fa-microphone-slash me-2"></i>
                      Mute
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fs-6 social-icon fa-solid fa-trash me-2"></i>
                      Delete chat
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="">
                    <a className="dropdown-item" href="#">
                      <i className="fs-6 social-icon fa-solid fa-box-archive me-2"></i>
                      Archive chat
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

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
                          {formatTimestamp(msg.timestamp)}
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

////
{
  /*

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './NewMessage';

export default function Messages({ setActiveComponent, currentAdminId }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [activeRecipient, setActiveRecipient] = useState(null);

  // Fetch employees and admins on component load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const [adminsRes, employeesRes] = await Promise.all([
          axios.get('http://localhost:3001/admins'),
          axios.get('http://localhost:3001/employees'),
        ]);
        setAdmins(adminsRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Fetch messages when the recipient changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeRecipient) return; // Prevent fetching if no recipient selected

      try {
        const response = await axios.get('http://localhost:3001/messages');
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender._id === currentAdminId &&
              msg.recipient._id === activeRecipient._id) ||
            (msg.sender._id === activeRecipient._id &&
              msg.recipient._id === currentAdminId)
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentAdminId, activeRecipient]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeRecipient) {
      console.error('Message content and recipient must be provided');
      return;
    }

    const messageData = {
      sender: { _id: currentAdminId },
      recipient: { _id: activeRecipient._id },
      senderModel: 'Admin', // Adjust this if using employee roles
      recipientModel: activeRecipient.role === 'Admin' ? 'Admin' : 'Employee',
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
    setActiveRecipient(recipient); // Update active recipient
    setMessages([]); // Clear previous messages
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (isYesterday) {
      return `Yesterday, ${messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else {
      return messageDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0">
              <div className="flex-shrink-0 avatar me-2">
               
                <Image
                  src={activeRecipient?.image || ''}
                  alt={activeRecipient?.name || 'Recipient Avatar'}
                  className="avatar-img rounded-circle"
                  width={40}
                  height={40}
                />
              </div>
              <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">
                  {activeRecipient ? activeRecipient.name : 'Recipient Name'}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <a
                href="#"
                className="icon-md me-2 px-2"
                onClick={() => setActiveComponent('ViewMessages')}
              >
                <i className="social-icon fa-solid fa-comments"></i>
              </a>
              <a href="#!" className="icon-md me-2 px-2">
                <i className="social-icon fa-solid fa-video"></i>
              </a>
              <NewMessage
                currentAdminId={currentAdminId}
                employees={employees}
                admins={admins}
                onRecipientSelect={handleRecipientSelect}
              />
              <div className="dropdown">
                <a
                  className="icon-md rounded-circle me-2 px-2"
                  href="#"
                  id="chatcoversationDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="social-icon fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end w-75">
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className=" fs-6 social-icon fa-solid fa-check me-2"></i>
                      Mark as read
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className=" fs-6 social-icon fa-solid fa-microphone-slash me-2"></i>
                      Mute
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fs-6 social-icon fa-solid fa-trash me-2"></i>
                      Delete chat
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="">
                    <a className="dropdown-item" href="#">
                      <i className="fs-6 social-icon fa-solid fa-box-archive me-2"></i>
                      Archive chat
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

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
                          {formatTimestamp(msg.timestamp)}
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
*/
}
