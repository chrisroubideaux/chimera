// Messages component
import axios from 'axios';
import { useState, useEffect } from 'react';

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('66d920a7274f0ef93f9dc3bd'); // Admin sender ID
  const [recipient, setRecipient] = useState('66d7d2c380470662dbca3239'); // Employee recipient ID
  const [messages, setMessages] = useState([]);

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
      sender: sender, // Admin's ID sending the message
      recipient: recipient, // Employee's ID receiving the message
      senderModel: 'Admin',
      recipientModel: 'Employee',
      messageContent: newMessage,
    };

    console.log('Message Data to be sent:', messageData);

    try {
      const newMessageResponse = await sendMessage(messageData);
      console.log('Response from API:', newMessageResponse);
      setMessages((prevMessages) => [...prevMessages, newMessageResponse]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="messages-container mt-3">
      <div className="card card-messages rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="tab-content py-0 mb-0 h-100" id="messagesTabsContent">
            <div
              className="fade tab-pane show active h-100"
              id="messages-1"
              role="tabpanel"
              aria-labelledby="messages-1-tab"
            >
              <div className="messages-conversation-content custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="text-center small my-2">No messages yet</div>
                ) : (
                  messages.map((message) => (
                    <div key={message._id}>
                      <div
                        className={`d-flex mb-1 ${
                          message.sender._id === sender
                            ? 'justify-content-end'
                            : ''
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 avatar avatar-xs me-2 ${
                            message.sender._id === sender ? 'd-none' : ''
                          }`}
                        >
                          <img className="" src="" alt="Avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="w-100">
                            <div
                              className={`d-flex flex-column ${
                                message.sender._id === sender
                                  ? 'align-items-end'
                                  : 'align-items-start'
                              }`}
                            >
                              <div className="small mb-1">
                                <h6 className="mt-1">{message.sender.name}</h6>
                              </div>
                              <div
                                className={`bg-${
                                  message.sender._id === sender
                                    ? 'light text-grey'
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
              <form className="messages-input-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className="btn btn-md" type="submit">
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
};

export default Messages;

{
  /*
import Link from 'next/link';

export default function Messages({ setActiveComponent }) {
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
                  <div className="d-flex mb-2 mb-sm-0">
                    <div className="flex-shrink-0 avatar me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/10.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-block flex-grow-1">
                      <h6 className="mb-0 mt-1">Name: Here</h6>
                      <div className="small text-secondary">
                        <i className="fa-solid fa-circle text-success me-1"></i>
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
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
                            <i className="social-icon fs-6 fa-solid fa-check"></i>
                            Mark as read
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="social-icon fa-solid fa-microphone-slash fs-6"></i>
                            Mute
                          </a>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            href="/messages/messages"
                          >
                            <i className="social-icon fs-6 fa-solid fa-user-check"></i>
                            View all
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="/">
                            <i className="social-icon fs-6 fa-solid fa-trash"></i>
                            Delete chat
                          </Link>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <Link className="dropdown-item" href="/">
                            <i className="social-icon fs-6 fa-solid fa-box-archive"></i>
                            Archive chat
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="chat-conversation-content custom-scrollbar">
                  <div className="text-center small my-2">
                    Jul 16, 2022, 06:15 am
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/10.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            This is placeholder text for messages project
                            chimera😊
                          </div>
                          <div className="small my-2">6:15 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end text-end mb-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white p-2 px-3 rounded-2">
                          This is a test response for project chimera
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <form className="chat-input-form">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message"
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

*/
}
