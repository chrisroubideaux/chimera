// calendar page
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import Tab from '@/components/calendar/Tab';
import Calendar from '@/components/calendar/Calendar';
import Week from '@/components/calendar/Week';
import Day from '@/components/calendar/Day';
import Badge from '@/components/calendar/Badge';

export default function Calendars() {
  const [activeComponent, setActiveComponent] = useState('Calendars');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Week':
        return <Week setActiveComponent={setActiveComponent} />;
      case 'Day':
        return <Day setActiveComponent={setActiveComponent} />;
      case 'Calendar':
        return <Calendar setActiveComponent={setActiveComponent} />;
      default:
        return <Calendar setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <>
      <Head>
        <title>Calendar</title>
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
        {admins.map((admins) => (
          <Tab
            setActiveComponent={setActiveComponent}
            key={admins.id}
            admins={admins}
          />
        ))}

        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              {admins.map((admins) => (
                <Sidebar
                  setActiveComponent={setActiveComponent}
                  key={admins.id}
                  admins={admins}
                />
              ))}
            </div>
            <div className="col-lg-8 col-xxl-9">
              <div className="mt-3">{renderComponent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
