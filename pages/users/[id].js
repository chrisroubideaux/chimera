// User by id page
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/user/Tab';
import Sidebar from '@/components/user/Sidebar';
import Bio from '@/components/user/Bio';
{
  /*
import Notifications from '@/components/profile/Notifications';
import Messages from '@/components/profile/Messages';
import ViewMessages from '@/components/profile/ViewMessages';
import Hours from '@/components/profile/Hours';
//import Chat from '@/components/messages/Chat';
import Schedule from '@/components/profile/Schedule';

import Calendar from '@/components/profile/Calendar';
import CalendarTab from '@/components/profile/CalendarTab';
import Form from '@/components/profile/Form';
import Payments from '@/components/profile/Payments';
*/
}
export default function Profile() {
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const router = useRouter();
  const { id } = router.query;
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
              <Sidebar users={user} />
            </div>
            <div className="col-lg-8 col-xxl-9">
              <Bio users={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
