// admin page
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Chats from '@/components/admin/Chats';
import Bio from '@/components/admin/Bio';
import Messages from '@/components/admin/Messages';
import Notifications from '@/components/admin/Notifications';
import Schedule from '@/components/admin/Schedule';
import TimeOff from '@/components/admin/TimeOff';

export default function Admin({}) {
  const router = useRouter();
  const { id } = router.query;
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [admin, setAdmin] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  useEffect(() => {
    if (id) {
      // Ensure userId is defined
      const fetchAdminData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/admins/${id}`
          );
          console.log('Admin data:', response.data);
          setAdmin(response.data);
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      };

      fetchAdminData();
    }
  }, [id]);
  //
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
  //
  const renderComponent = () => {
    console.log('Admin data for Bio:', admin);
    switch (activeComponent) {
      case 'Events':
        return <Chats />;
      case 'Messages':
        return (
          <Messages
            messages={message}
            setActiveComponent={setActiveComponent}
            senderId={id}
            recipientId={selectedRecipient?.id}
            senderRole="Admin"
            recipientRole={selectedRecipient?.role}
          />
        );
      case 'Notifications':
        return <Notifications setActiveComponent={setActiveComponent} />;
      case 'Schedule':
        return <Schedule setActiveComponent={setActiveComponent} />;
      case 'TimeOff':
        return <TimeOff setActiveComponent={setActiveComponent} />;
      default:
        return <Bio admins={admin} />;
    }
  };
  return (
    <>
      <Head>
        <title>Admin</title>
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
              <Sidebar admins={admin} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
