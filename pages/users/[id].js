// User by id page
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/user/Tab';
import Sidebar from '@/components/user/Sidebar';
import Bio from '@/components/user/Bio';
import Notifications from '@/components/user/Notifactions';
import Calendar from '@/components/user/Calendar';
import TimeOff from '@/components/user/TimeOff';
import CalendarTab from '@/components/user/CalendarTab';

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const router = useRouter();
  const { id } = router.query;
  const [meetings, setMeetings] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [user, setUser] = useState([]);

  // user
  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://chimera-h56c.onrender.com/users/${id}`
          );
          console.log('User data:', response.data);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [id]);
  //
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

  //
  const renderComponent = () => {
    console.log('User data for Bio:', user);
    switch (activeComponent) {
      case 'Calendar':
        return <Calendar setActiveComponent={setActiveComponent} />;

      case 'Notifications':
        return (
          <Notifications
            meetings={meetings}
            timeOffRequests={timeOffRequests}
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
        return <Bio users={user} />;
    }
  };
  //
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

        {activeComponent === 'Calendar' ? (
          <CalendarTab
            setActiveComponent={setActiveComponent}
            users={user}
            meetings={meetings}
          />
        ) : (
          <Tab user={user} setActiveComponent={setActiveComponent} />
        )}
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar users={user} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
