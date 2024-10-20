// View messages componet
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './NewMessage';

export default function ViewMessages({
  setActiveComponent,
  currentEmployeeId,
  currentAdminId,
}) {
  const [conversations, setConversations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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
          latestMessage: msg, // Store the latest message
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
                    <a href="#" className="me-2">
                      <NewMessage
                        currentAdminId={currentAdminId}
                        employees={employees}
                        admins={admins}
                        senderModel="Admin"
                      />
                    </a>
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
                            // Call setActiveComponent to navigate to the Messages component
                            setActiveComponent(
                              'Messages',
                              conversation.recipientId
                            ); // Pass the recipient ID
                          }}
                        >
                          <span className="pt-1 form-checked-content">
                            <strong className="d-flex me-5 text-dark">
                              {conversation.senderName}
                            </strong>
                            <div className="mb-1">
                              <Image
                                src={
                                  conversation.latestMessage.sender.image ||
                                  '/path/to/default-avatar.jpg'
                                }
                                width={30}
                                height={30}
                                className="rounded-circle"
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

{
  /*
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './NewMessage';

export default function ViewMessages({
  setActiveComponent,
  currentEmployeeId,
  currentAdminId,
}) {
  const [conversations, setConversations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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

        console.log('Grouped Conversations:', groupedConversations); // Debug log

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
          latestMessage: msg, // Store the latest message
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
                    <a href="#" className="me-2">
                      <NewMessage
                        currentAdminId={currentAdminId}
                        employees={employees}
                        admins={admins}
                        senderModel="Admin"
                      />
                    </a>
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
                        >
                          <span className="pt-1 form-checked-content">
                            <strong className="d-flex me-5 text-dark">
                              {conversation.senderName}
                            </strong>
                            <div className="mb-1">
                              <Image
                                src={
                                  conversation.latestMessage.sender.image ||
                                  '/path/to/default-avatar.jpg'
                                }
                                width={30}
                                height={30}
                                className="rounded-circle"
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
