import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/profile/Tab';
import Sidebar from '@/components/profile/Sidebar';
import Notifications from '@/components/profile/Notifications';
import Messages from '@/components/profile/Messages';
import Hours from '@/components/profile/Hours';
//import Chat from '@/components/messages/Chat';
import Schedule from '@/components/profile/Schedule';
import Bio from '@/components/profile/Bio';
import Calendar from '@/components/profile/Calendar';
import CalendarTab from '@/components/profile/CalendarTab';
import Form from '@/components/profile/Form';

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const router = useRouter();
  const { id } = router.query;
  const [employee, setEmployee] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  //

  // employee
  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/employees/${id}`
          );
          console.log('Employee data:', response.data);
          setEmployee(response.data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  // messages
  // Fetch message data
  useEffect(() => {
    if (id) {
      const fetchMessageData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/messages/${id}`
          );
          console.log('Message data:', response.data);
          setMessage(response.data);

          // Set the selected recipient based on the first message or some logic
          if (response.data.length > 0) {
            setSelectedRecipient(response.data[0].recipient);
          }
        } catch (error) {
          console.error('Error fetching message data:', error);
        }
      };

      fetchMessageData();
    }
  }, [id]);
  {
    /*
  useEffect(() => {
    if (id) {
      const fetchMessageData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/messages/${id}`
          );
          console.log('messagese data:', response.data);
          setMessage(response.data);
        } catch (error) {
          console.error('Error fetching message data:', error);
        }
      };

      fetchMessageData();
    }
  }, [id]);

*/
  }
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Form':
        return <Form />;
      case 'Calendar':
        return <Calendar />;
      case 'Schedule':
        return <Schedule setActiveComponent={setActiveComponent} />;
      case 'Hours':
        return <Hours setActiveComponent={setActiveComponent} />;
        {
          /*
      case 'Events':
        return <Chat messages={message} />;
    */
        }
      case 'Messages':
        return (
          <Messages
            messages={message}
            setActiveComponent={setActiveComponent}
            senderId={id}
            recipientId={selectedRecipient?.id}
            senderRole="user"
            recipientRole={selectedRecipient?.role}
          />
        );
      case 'Notifications':
        return <Notifications setActiveComponent={setActiveComponent} />;
      case 'CalendarTab':
        return <CalendarTab setActiveComponent={setActiveComponent} />;
      default:
        return <Bio employees={employee} />;
    }
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Frijole&family=Teko:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"
        />
      </Head>
      <div className="layout h-100">
        <Navbar />
        <Tab setActiveComponent={setActiveComponent} />

        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar
                employees={employee}
                setActiveComponent={setActiveComponent}
              />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}