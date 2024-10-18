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
  const [messages, setMessages] = useState([]);
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
        const allMessages = messagesRes.data;

        // Attach sender/recipient names to messages
        const enrichedMessages = allMessages.map((msg) => {
          const sender = findUserById(
            msg.sender._id,
            msg.senderModel,
            adminsRes.data,
            employeesRes.data
          );
          return {
            ...msg,
            senderName: sender?.name || 'Unknown Sender',
            timestamp: new Date(msg.timestamp).toLocaleString(),
          };
        });

        setMessages(enrichedMessages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

                    <a href="#" className=" me-2">
                      <NewMessage
                        currentAdminId={currentAdminId}
                        employees={employees}
                        admins={admins} // Pass admins state here
                        senderModel="Admin"
                      />
                    </a>
                  </div>
                  <hr />
                  <div className="list-group" style={{ width: '50rem' }}>
                    {messages.map((message) => (
                      <label
                        key={message._id}
                        className="list-group-item d-flex gap-3"
                      >
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">
                            {message.senderName}
                          </strong>
                          <h6 className="d-block text-dark">
                            <Image
                              src={
                                message.sender.image ||
                                '/path/to/default-avatar.jpg'
                              }
                              width={30}
                              height={30}
                              className="rounded-circle"
                            />
                            {message.messageContent}
                          </h6>
                          {message.timestamp}
                        </span>
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
import Link from 'next/link';

export default function ViewMessages({ setActiveComponent }) {
  return (
    <div>
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
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1">
                          View Messages
                        </h6>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-bold me-2 px-2">
                        Total Hours
                        <i className=" social-icon fa-solid fa-hourglass-end"></i>
                      </h6>
                    </div>
                  </div>

                  <hr />

             
                  <div className="">
                    <div className="list-group" style={{ width: '50rem' }}>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">sendersname</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Message content
                          </h5>
                          current date
                        </span>
                      </label>
                    </div>
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
