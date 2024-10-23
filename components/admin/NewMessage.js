import { useState, useEffect } from 'react';

export default function NewMessage({
  employees = [],
  admins = [],
  onRecipientSelect,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track loading state

  // Load employees/admins, and only then read from localStorage
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

      setIsDataLoaded(true); // Mark data as loaded
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
    e.preventDefault(); // Prevent default form submission
    const messageContent = e.target.elements.message.value;
    if (selectedId && messageContent) {
      // Send the message logic can go here
      console.log('Message sent to:', selectedId, 'Content:', messageContent);
      // Clear the message input after sending
      e.target.reset();
    }
  };

  if (!isDataLoaded) {
    return <div>Loading contacts...</div>; // Prevent rendering until data is ready
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
                    name="message" // Add name for the input
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

//
{
  /*
import { useState, useEffect } from 'react';

export default function NewMessage({
  employees = [],
  admins = [],
  onRecipientSelect,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track loading state

  // Load employees/admins, and only then read from localStorage
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

      setIsDataLoaded(true); // Mark data as loaded
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

  if (!isDataLoaded) {
    return <div>Loading contacts...</div>; // Prevent rendering until data is ready
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

              <form>
                <div className="input-group" style={{ width: '30rem' }}>
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
