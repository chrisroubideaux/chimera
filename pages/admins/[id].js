import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Bio from '@/components/admin/Bio';
import Messages from '@/components/admin/Messages';
import ViewMessages from '@/components/admin/ViewMessages';
import Notifications from '@/components/admin/Notifications';
import Calendar from '@/components/calendar/Calendar';
import Schedule from '@/components/admin/Schedule';
import TimeOff from '@/components/admin/TimeOff';

export default function Admin({}) {
  const router = useRouter();
  const { id } = router.query;
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [admin, setAdmin] = useState([]);
  const [message, setMessage] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  // admin
  useEffect(() => {
    if (id) {
      const fetchAdminData = async () => {
        try {
          const response = await axios.get(
            `https://chimera-h56c.onrender.com/admins/${id}`
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

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          'https://chimera-h56c.onrender.com/employees'
        );
        if (response.data.length > 0) {
          setEmployeeId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchEmployeeData();
  }, []);

  // Fetch message data
  useEffect(() => {
    if (id) {
      const fetchMessageData = async () => {
        try {
          const response = await axios.get(
            `https://chimera-h56c.onrender.com/messages/${id}`
          );
          console.log('Message data:', response.data);
          setMessage(response.data);

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

  // Fetch meetings
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/meetings')
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  // timeoff api

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get(
          'https://chimera-h56c.onrender.com/timeOff'
        );
        setTimeOffRequests(response.data);
        console.log('Time-off data:', response.data);
      } catch (error) {
        console.error('Error fetching time-off data:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);
  const renderComponent = () => {
    console.log('Admin data for Bio:', admin);
    switch (activeComponent) {
      case 'Messages':
        return (
          <Messages
            messages={message}
            setActiveComponent={setActiveComponent}
            currentAdminId={admin._id}
            selectedRecipientId={employeeId}
            recipientId={employeeId}
            senderModel="Admin"
            recipientModel="Employee"
          />
        );
      case 'Calendar':
        return <Calendar setActiveComponent={setActiveComponent} />;
      case 'ViewMessages':
        return <ViewMessages setActiveComponent={setActiveComponent} />;
      case 'Notifications':
        return (
          <Notifications
            meetings={meetings}
            timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );
      case 'Schedule':
        return (
          <Schedule
            meetings={meetings}
            setActiveComponent={setActiveComponent}
          />
        );
      case 'TimeOff':
        return (
          <TimeOff
            timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );
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
