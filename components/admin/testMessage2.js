// Messages component
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

export default function Messages({ setActiveComponent }) {
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('66d920a7274f0ef93f9dc3bd'); // Admin sender ID
  const [recipient, setRecipient] = useState('66d7d2c380470662dbca3239'); // Employee recipient ID
  const [messages, setMessages] = useState([]);

  // Fetch messages on load
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3001/messages');
        setMessages(response.data);
      } catch (error) {
        console.error(
          'Error fetching messages:',
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchMessages();
  }, []);

  const sendMessage = async (messageData) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/messages',
        messageData
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage) {
      console.error('Message Content must be provided');
      return;
    }

    const messageData = {
      sender,
      recipient,
      senderModel: 'Admin',
      recipientModel: 'Employee',
      messageContent: newMessage,
    };

    try {
      const newMessageResponse = await sendMessage(messageData);
      setMessages((prevMessages) => [...prevMessages, newMessageResponse]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="mt-3">
      <div className="chat-container ">
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
                  {/* Chat header with user info */}
                  <div className="d-flex mb-2 mb-sm-0">
                    <div className="flex-shrink-0 avatar me-2"></div>

                    <div className="d-block flex-grow-1">
                      <h6 className="mb-0 mt-1">
                        {messages.length > 0
                          ? messages[0].recipient.name
                          : 'No Sender'}
                      </h6>
                      <div className="small text-secondary">
                        <i className="fa-solid fa-circle text-success me-1"></i>{' '}
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* Icons for different actions */}
                    <a
                      href="#!"
                      className="icon-md me-2 px-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="View All Messages"
                      onClick={() => setActiveComponent('Events')}
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
                      title="Create new message"
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
                          <a className="dropdown-item" href="#">
                            Mark as read
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Mute
                          </a>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            href="/messages/messages"
                          >
                            View all
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="/">
                            Delete chat
                          </Link>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <Link className="dropdown-item" href="/">
                            Archive chat
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr />
                {/* Chat conversation display */}
                <div className="chat-conversation-content custom-scrollbar">
                  {messages.length === 0 ? (
                    <div className="text-center small my-2">
                      No messages yet
                    </div>
                  ) : (
                    messages.map((messages) => (
                      <div key={messages._id}>
                        <div
                          className={`d-flex mb-1 ${
                            messages.sender._id === sender
                              ? 'justify-content-end'
                              : ''
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 avatar avatar-xs me-2 ${
                              messages.sender._id === sender ? 'd-none' : ''
                            }`}
                          >
                            <Image
                              className="avatar-img rounded-circle"
                              src={
                                messages.sender.image
                                  ? messages.sender.image
                                  : ''
                              }
                              alt=""
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="w-100">
                              <div className="d-flex flex-column">
                                <div className="small mb-1">
                                  <h6 className="mt-1">
                                    {messages.sender.name}
                                  </h6>
                                </div>
                                <div
                                  className={`bg-${
                                    messages.sender._id === sender
                                      ? 'light text-grey'
                                      : 'light text-secondary'
                                  } p-2 px-3 rounded-2`}
                                >
                                  {messages.messageContent}
                                </div>
                                <div className="small my-2">
                                  {new Date(
                                    messages.timestamp
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
                {/* Message input form */}
                <form className="chat-input-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-sm" type="submit">
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
