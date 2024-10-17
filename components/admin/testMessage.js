// Messages component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Messages({
  setActiveComponent,
  currentAdminId,
  recipientId,
  senderModel = 'Admin',
  recipientModel = 'Employee',
}) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages on load
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3001/messages');
        setMessages(response.data);
        console.log('Fetched messages:', response.data);
      } catch (error) {
        console.error(
          'Error fetching messages:',
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchMessages();
  }, []);

  // Send message function
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      console.error('Message content must be provided');
      return;
    }

    const messageData = {
      sender: currentAdminId,
      recipient: recipientId,
      senderModel,
      recipientModel,
      messageContent: newMessage,
    };

    console.log('Sending message:', messageData);

    try {
      const response = await axios.post(
        'http://localhost:3001/messages',
        messageData
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="chat-conversation-content custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center small my-2">No messages yet</div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`d-flex mb-1 ${
                    message.sender._id === currentAdminId
                      ? 'justify-content-end'
                      : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 avatar avatar-xs me-2 ${
                      message.sender._id === currentAdminId ? 'd-none' : ''
                    }`}
                  >
                    <img
                      src={message.sender.image || ''}
                      alt=""
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="w-100">
                      <div className="d-flex flex-column">
                        <h6 className="mt-1">{message.sender.name}</h6>
                        <div
                          className={`bg-${
                            message.sender._id === currentAdminId
                              ? 'light text-grey'
                              : 'light text-secondary'
                          } p-2 px-3 rounded-2`}
                        >
                          {message.messageContent}
                        </div>
                        <div className="small my-2">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
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
