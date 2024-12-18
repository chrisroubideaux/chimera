import { useState, useEffect } from 'react';

export default function NewMessage({
  employees = [],
  admins = [],
  onRecipientSelect,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (employees.length > 0 || admins.length > 0) {
      const storedRecipientId = localStorage.getItem('selectedRecipientId');
      console.log('Stored Recipient ID:', storedRecipientId);

      if (storedRecipientId) {
        const selectedRecipient =
          employees.find((emp) => emp._id === storedRecipientId) ||
          admins.find((admin) => admin._id === storedRecipientId);

        if (selectedRecipient) {
          console.log('Selected Recipient Found:', selectedRecipient);
          setSelectedId(storedRecipientId);
          const recipientModel = storedRecipientId.startsWith('66')
            ? 'Admin'
            : 'Employee';
          onRecipientSelect({ ...selectedRecipient, model: recipientModel });
        }
      }

      setIsDataLoaded(true);
    }
  }, [employees, admins]);

  const handleRecipientChange = (e) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);
    localStorage.setItem('selectedRecipientId', selectedId);

    const selectedRecipient =
      employees.find((emp) => emp._id === selectedId) ||
      admins.find((admin) => admin._id === selectedId);

    if (selectedRecipient) {
      const recipientModel = selectedId.startsWith('66') ? 'Admin' : 'Employee';
      onRecipientSelect({ ...selectedRecipient, model: recipientModel });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageContent = e.target.elements.message.value;
    if (selectedId && messageContent) {
      console.log('Message sent to:', selectedId, 'Content:', messageContent);

      e.target.reset();
    }
  };

  if (!isDataLoaded) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm bg-transparent me-1 px-2"
        data-bs-toggle="modal"
        data-bs-target="#newMessageModal"
      >
        <i className="social-icon fa-solid fa-square-pen"></i>
      </button>

      <div
        className="modal fade"
        id="newMessageModal"
        tabIndex="-1"
        aria-labelledby="newMessageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newMessageModalLabel">
                New Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">To</span>
                <select
                  className="form-select"
                  onChange={handleRecipientChange}
                  value={selectedId}
                >
                  <option value="">Contacts</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSendMessage}>
                <div className="input-group" style={{ width: '30rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    name="message"
                    required
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
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewMessage({
  currentEmployeeId,
  employees,
  admins,
  senderModel = 'Employee', // Default sender model is 'Employee'
}) {
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState(''); // Dynamic recipient ID state
  const [recipientModel, setRecipientModel] = useState(''); // Dynamic recipient model

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !recipientId) {
      console.error('Message content and recipient must be provided');
      return;
    }

    const messageData = {
      sender: { _id: currentEmployeeId },
      recipient: { _id: recipientId }, // Use recipientId from the state
      senderModel,
      recipientModel, // Use the dynamic recipient model
      messageContent: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/messages',
        messageData
      );
      console.log('Message sent successfully:', response.data);
      setNewMessage('');
      setRecipientId(''); // Clear after sending
      setRecipientModel(''); // Reset model after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleRecipientChange = (e) => {
    const selectedId = e.target.value;
    setRecipientId(selectedId);

    // Dynamically determine if the recipient is an Admin or Employee
    const isAdmin = admins.some((admin) => admin._id === selectedId);
    setRecipientModel(isAdmin ? 'Admin' : 'Employee');
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm bg-transparent me-1 px-2"
        data-bs-toggle="modal"
        data-bs-target="#newMessageModal"
      >
        <i className="social-icon fa-solid fa-square-pen"></i>
      </button>

      <div
        className="modal fade"
        id="newMessageModal"
        tabIndex="-1"
        aria-labelledby="newMessageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newMessageModalLabel">
                New Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
           
              <div className="input-group mb-3">
                <span className="input-group-text">To</span>
                <select
                  className="form-select"
                  value={recipientId}
                  onChange={handleRecipientChange} // Set recipient ID and model
                >
                  <option value="">Contacts</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>

            
              <form onSubmit={handleSubmit}>
                <div className="input-group" style={{ width: '30rem' }}>
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
*/
}
