import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Messages({ setActiveComponent }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages from the backend
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`http://localhost:3001/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);

  // Handle new message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await axios.post('http://localhost:3001/messages', {
          content: newMessage,
        });
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  // Mark a message as read
  const handleMarkAsRead = async () => {
    try {
      // Replace with actual API call to mark as read
      await axios.post('http://localhost:3001/messages/markAsRead');
      // Handle UI updates if needed
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Mute chat
  const handleMute = async () => {
    try {
      // Replace with actual API call to mute chat
      await axios.post('http://localhost:3001/messages/mute');
      // Handle UI updates if needed
    } catch (error) {
      console.error('Error muting chat:', error);
    }
  };

  // Delete chat
  const handleDeleteChat = async () => {
    try {
      // Replace with actual API call to delete chat
      await axios.delete('http://localhost:3001/messages');
      setMessages([]);
      // Handle UI updates if needed
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  // Archive chat
  const handleArchiveChat = async () => {
    try {
      // Replace with actual API call to archive chat
      await axios.post('http://localhost:3001/messages/archive');
      // Handle UI updates if needed
    } catch (error) {
      console.error('Error archiving chat:', error);
    }
  };

  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
            <div
              className="fade tab-pane show active h-100"
              id="chat-1"
              role="tabpanel"
              aria-labelledby="chat-1-tab"
            >
              <div className="d-sm-flex justify-content-between align-items-center">
                <div className="d-flex mb-2 mb-sm-0">
                  <div className="flex-shrink-0 avatar me-2">
                    <img
                      className="avatar-img rounded-circle"
                      src="assets/images/avatar/10.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="d-block flex-grow-1">
                    <h6 className="mb-0 mt-1">
                      {messages.length > 0
                        ? messages[0].recipient.name
                        : 'Recipient Name'}
                    </h6>
                    <div className="small text-secondary"></div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="View All Messages"
                  >
                    <i className="social-icon fa-solid fa-comments"></i>
                  </a>
                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Video call"
                  >
                    <i className="social-icon fa-solid fa-video"></i>
                  </a>
                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Start New Chat"
                  >
                    <i className="social-icon fa-solid fa-square-pen"></i>
                  </a>
                  <div className="dropdown">
                    <a
                      className="icon-md rounded-circle me-2 px-2"
                      href="#"
                      id="chatcoversationDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      <i className="social-icon fa-solid fa-ellipsis-vertical"></i>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="chatcoversationDropdown"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleMarkAsRead}
                        >
                          <i className="social-icon fs-6 fa-solid fa-check me-2"></i>
                          Mark as read
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleMute}
                        >
                          <i className="social-icon fs-6 fa-solid fa-microphone-slash me-2"></i>
                          Mute
                        </a>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/profile/profile">
                          <i className="social-icon fa-solid fa-user-check me-2"></i>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleDeleteChat}
                        >
                          <i className="social-icon fs-6 fa-solid fa-trash me-2"></i>
                          Delete chat
                        </a>
                      </li>
                      <li className="dropdown-divider"></li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleArchiveChat}
                        >
                          <i className="social-icon fs-6 fa-solid fa-box-archive me-2"></i>
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
                  messages.map((message) => (
                    <div key={message._id}>
                      <div
                        className={`d-flex mb-1 ${
                          message.sender._id === 'currentUserId'
                            ? 'justify-content-end'
                            : ''
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 avatar avatar-xs me-2 ${
                            message.sender._id === 'currentUserId'
                              ? 'd-none'
                              : ''
                          }`}
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/10.jpg"
                            alt="Avatar"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <div className="w-100">
                            <div
                              className={`d-flex flex-column ${
                                message.sender._id === 'currentUserId'
                                  ? 'align-items-end'
                                  : 'align-items-start'
                              }`}
                            >
                              <div className="small mb-1">
                                <h6 className="mt-1">{message.sender.name}</h6>
                              </div>
                              <div
                                className={`bg-${
                                  message.sender._id === 'currentUserId'
                                    ? 'primary text-white'
                                    : 'light text-secondary'
                                } p-2 px-3 rounded-2`}
                              >
                                {message.messageContent}
                              </div>
                              <div className="small my-2">
                                {new Date(
                                  message.timestamp
                                ).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                )}
              </div>
              <hr />
              <form className="chat-input-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                    value={newMessage}
                  />
                  <button
                    className="btn btn-md"
                    disabled={!newMessage.trim()}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
