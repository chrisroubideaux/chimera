// View messages componet
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessages from './NewMessages';

const formatMessageTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formattedTime = messageDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = messageDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const isToday =
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear();

  const isYesterday =
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return `${formattedDate}, ${formattedTime}`;
  } else if (isYesterday) {
    return `Yesterday, ${formattedTime}`;
  } else {
    return `${formattedDate}, ${formattedTime}`;
  }
};

export default function ViewMessages({
  setActiveComponent,
  currentEmployeeId,
  currentAdminId,
}) {
  const [conversations, setConversations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRecipient, setActiveRecipient] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [messagesRes, adminsRes, employeesRes] = await Promise.all([
          axios.get('https://chimera-h56c.onrender.com/messages'),
          axios.get('https://chimera-h56c.onrender.com/admins'),
          axios.get('https://chimera-h56c.onrender.com/employees'),
        ]);

        setAdmins(adminsRes.data);
        setEmployees(employeesRes.data);

        const groupedConversations = groupMessagesByConversation(
          messagesRes.data
        );

        const enrichedConversations = groupedConversations.map((conv) => {
          const sender = findUserById(
            conv.senderId,
            conv.senderModel,
            adminsRes.data,
            employeesRes.data
          );

          return {
            ...conv,
            senderName: sender?.name || 'Unknown Sender',
            timestamp: formatMessageTimestamp(conv.latestMessage.timestamp),
          };
        });

        setConversations(enrichedConversations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [currentAdminId]);

  const groupMessagesByConversation = (allMessages) => {
    const grouped = {};

    allMessages.forEach((msg) => {
      const key = generateConversationKey(msg.sender._id, msg.recipient._id);
      if (
        !grouped[key] ||
        new Date(msg.timestamp) > new Date(grouped[key].latestMessage.timestamp)
      ) {
        grouped[key] = {
          senderId: msg.sender._id,
          senderModel: msg.senderModel,
          recipientId: msg.recipient._id,
          latestMessage: msg,
        };
      }
    });

    return Object.values(grouped);
  };

  const generateConversationKey = (senderId, recipientId) =>
    [senderId, recipientId].sort().join('-');

  const findUserById = (id, model, admins, employees) => {
    if (model === 'Admin') return admins.find((admin) => admin._id === id);
    if (model === 'Employee') return employees.find((emp) => emp._id === id);
    return null;
  };

  const handleRecipientSelect = (recipient) => {
    setActiveRecipient(recipient);
    console.log('Recipient selected:', recipient);
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="mt-3">
        <div className="chat-container">
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
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1 fs-4">
                          Messages
                        </h6>
                      </div>
                    </div>
                    <NewMessages
                      currentEmployeeId={currentEmployeeId}
                      employees={employees}
                      admins={admins}
                      senderModel="Admin"
                      onRecipientSelect={handleRecipientSelect}
                    />
                  </div>
                  <hr />
                  <div className="list-group" style={{ width: '50rem' }}>
                    {conversations.map((conversation) => (
                      <label
                        key={generateConversationKey(
                          conversation.senderId,
                          conversation.recipientId
                        )}
                        className="list-group-item d-flex gap-3"
                      >
                        <a
                          href="#"
                          className="nav-link bg-transparent fs-6 me-2 text-dark"
                          onClick={() => {
                            setActiveComponent(
                              'Messages',
                              conversation.recipientId
                            );
                          }}
                        >
                          <span className="pt-1 form-checked-content">
                            <strong className="d-flex me-5 text-dark">
                              {conversation.senderName}
                            </strong>
                            <div className="mb-1">
                              <Image
                                src={activeRecipient?.image || ''}
                                alt={
                                  activeRecipient?.name || 'Recipient Avatar'
                                }
                                className="avatar-img rounded-circle"
                                width={40}
                                height={40}
                              />
                              {conversation.latestMessage.messageContent}
                            </div>
                            {conversation.timestamp}{' '}
                            {/* Display formatted timestamp */}
                          </span>
                        </a>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessages from './NewMessages';

export default function ViewMessages({
  setActiveComponent,
  currentEmployeeId,
  currentAdminId,
}) {
  const [conversations, setConversations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRecipient, setActiveRecipient] = useState(null); // Added state for activeRecipient

  // Fetch messages, admins, and employees data on load
  useEffect(() => {
    async function fetchData() {
      try {
        const [messagesRes, adminsRes, employeesRes] = await Promise.all([
          axios.get('http://localhost:3001/messages'),
          axios.get('http://localhost:3001/admins'),
          axios.get('http://localhost:3001/employees'),
        ]);

        setAdmins(adminsRes.data);
        setEmployees(employeesRes.data);

        // Group messages and keep only the latest message per conversation
        const groupedConversations = groupMessagesByConversation(
          messagesRes.data
        );

        const enrichedConversations = groupedConversations.map((conv) => {
          const sender = findUserById(
            conv.senderId,
            conv.senderModel,
            adminsRes.data,
            employeesRes.data
          );

          return {
            ...conv,
            senderName: sender?.name || 'Unknown Sender',
            timestamp: new Date(conv.latestMessage.timestamp).toLocaleString(),
          };
        });

        setConversations(enrichedConversations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [currentAdminId]);

  // Group messages by sender and recipient, keeping only the latest message
  const groupMessagesByConversation = (allMessages) => {
    const grouped = {};

    allMessages.forEach((msg) => {
      const key = generateConversationKey(msg.sender._id, msg.recipient._id);
      if (
        !grouped[key] ||
        new Date(msg.timestamp) > new Date(grouped[key].latestMessage.timestamp)
      ) {
        grouped[key] = {
          senderId: msg.sender._id,
          senderModel: msg.senderModel,
          recipientId: msg.recipient._id,
          latestMessage: msg,
        };
      }
    });

    return Object.values(grouped);
  };

  // Generate a unique key for each conversation (sender/recipient pair)
  const generateConversationKey = (senderId, recipientId) =>
    [senderId, recipientId].sort().join('-');

  // Find a user by ID and model (Admin/Employee)
  const findUserById = (id, model, admins, employees) => {
    if (model === 'Admin') return admins.find((admin) => admin._id === id);
    if (model === 'Employee') return employees.find((emp) => emp._id === id);
    return null;
  };

  // Function to handle recipient selection
  const handleRecipientSelect = (recipient) => {
    setActiveRecipient(recipient); // Set the selected recipient
    console.log('Recipient selected:', recipient);
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="mt-3">
        <div className="chat-container">
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
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1 fs-4">
                          Messages
                        </h6>
                      </div>
                    </div>
                    <NewMessages
                      currentEmployeeId={currentEmployeeId}
                      employees={employees}
                      admins={admins}
                      senderModel="Admin"
                      onRecipientSelect={handleRecipientSelect}
                    />
                  </div>
                  <hr />
                  <div className="list-group" style={{ width: '50rem' }}>
                    {conversations.map((conversation) => (
                      <label
                        key={generateConversationKey(
                          conversation.senderId,
                          conversation.recipientId
                        )}
                        className="list-group-item d-flex gap-3"
                      >
                        <a
                          href="#"
                          className="nav-link bg-transparent fs-6 me-2 text-dark"
                          onClick={() => {
                            setActiveComponent(
                              'Messages',
                              conversation.recipientId
                            );
                          }}
                        >
                          <span className="pt-1 form-checked-content">
                            <strong className="d-flex me-5 text-dark">
                              {conversation.senderName}
                            </strong>
                            <div className="mb-1">
                              <Image
                                src={activeRecipient?.image || ''}
                                alt={
                                  activeRecipient?.name || 'Recipient Avatar'
                                }
                                className="avatar-img rounded-circle"
                                width={40}
                                height={40}
                              />
                              {conversation.latestMessage.messageContent}
                            </div>
                            {conversation.timestamp}
                          </span>
                        </a>
                      </label>
                    ))}
                  </div>
                </div>
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
