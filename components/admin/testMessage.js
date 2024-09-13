// Messages component
import axios from 'axios';
import { useState, useEffect } from 'react';

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState([]); // Admin sender ID
  const [recipient, setRecipient] = useState([]); // Employee recipient ID
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
      sender: '66d920a7274f0ef93f9dc3bd', // Admin's ID sending the message
      recipient: '66d7d2c380470662dbca3239', // Employee's ID receiving the message
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
