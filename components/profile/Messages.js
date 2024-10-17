import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './newMessage';

export default function Messages({
  setActiveComponent,
  currentEmployeeId,
  recipientId,
  senderModel = 'Employee',
  recipientModel = 'Admin',
}) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]); // Initialize as an array
  const [admins, setAdmins] = useState([]); // Initialize as an array

  // Fetch messages for the current employee
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3001/messages');
        const allMessages = response.data;

        const filteredMessages = allMessages.filter(
          (msg) =>
            msg.sender._id === currentEmployeeId ||
            msg.recipient._id === currentEmployeeId
        );

        setMessages(filteredMessages);
      } catch (error) {
        console.error(
          'Error fetching messages:',
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchMessages();
  }, [currentEmployeeId]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      console.error('Message content must be provided');
      return;
    }

    const isRecipientAdmin = admins.some((admin) => admin._id === recipientId);
    const recipientModel = isRecipientAdmin ? 'Admin' : 'Employee';

    const messageData = {
      sender: { _id: currentEmployeeId },
      recipient: { _id: recipientId },
      senderModel,
      recipientModel,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

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
  // admins

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await axios.get('http://localhost:3001/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    }

    fetchAdmins();
  }, []);
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
                  <div className="flex-shrink-0 avatar me-2"></div>
                  <div className="d-block flex-grow-1">
                    <h6>Messages</h6>
                    {/*
                    <div className="small text-secondary">
                      <i className="fa-solid fa-circle text-success me-1"></i>
                      Online
                    </div>
                    */}
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
                  <a href="#!" className="icon-md me-2 px-2">
                    <NewMessage
                      //  currentEmployeeId={currentEmployeeId}
                      //recipientId={recipientId}
                      //senderModel={senderModel}
                      //recipientModel={recipientModel}
                      //employees={employees}
                      //admins={admins}
                      currentEmployeeId={currentEmployeeId}
                      employees={employees}
                      admins={admins}
                      senderModel="Employee"
                    />
                  </a>
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
                          <i className="fs-6 social-icon fa-solid fa-check me-2"></i>
                          Mark as read
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fs-6 social-icon fa-solid fa-microphone-slash me-2"></i>
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
                      <li>
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
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`d-flex mb-1 ${
                        message.sender._id === currentEmployeeId
                          ? 'justify-content-end'
                          : ''
                      }`}
                    >
                      <div
                        className={`avatar avatar-xs me-2 ${
                          message.sender._id === currentEmployeeId
                            ? 'd-none'
                            : ''
                        }`}
                      >
                        <Image
                          src={
                            message.sender.image ||
                            '/path/to/default-avatar.jpg'
                          }
                          alt={message.sender.name}
                          width={30}
                          height={30}
                          className="rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="w-100">
                          <div className="d-flex flex-column">
                            <h6 className="mt-1">{message.sender.name}</h6>
                            <div
                              className={`bg-${
                                message.sender._id === currentEmployeeId
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
      </div>
    </div>
  );
}

{
  /*

// test component
import Image from 'next/image';

export default function Messages({ setActiveComponent }) {

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
                  <div className="flex-shrink-0 avatar me-2"></div>
                  <div className="d-block flex-grow-1">
                    <h6 className="mb-0 mt-1">
                  
                        recepientname
                    </h6>
                    <div className="small text-secondary">
                      <i className="fa-solid fa-circle text-success me-1"></i>{' '}
                      Online
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <a href="#!" className="icon-md me-2 px-2">
                    <i className="social-icon fa-solid fa-comments"></i>
                  </a>
                  <a href="#!" className="icon-md me-2 px-2">
                    <i className="social-icon fa-solid fa-video"></i>
                  </a>
                  <a href="#!" className="icon-md me-2 px-2">
                    <i className="social-icon fa-solid fa-square-pen"></i>
                  </a>
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
                  <div className="text-center small my-2">No messages yet</div>
                    <div
                    
                      className=
                    >
                      <div
                        className=" avatar avatar-xs me-2"
                      >
                        <img
                          src=""
                          alt=""
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="w-100">
                          <div className="d-flex flex-column">
                            <h6 className="mt-1">{message.sender.name}</h6>
                            <div
                              className=
                                
                                "
                               p-2 px-3 rounded-2"
                            >
                            
                            </div>
                            <div className="small my-2">
                           
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
                   
                  />
                  <button className="btn btn-primary" type="submit">
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
*/
}
