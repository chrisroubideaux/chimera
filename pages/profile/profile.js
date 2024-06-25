// profile page
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/profile/Tab';
import Sidebar from '@/components/profile/Sidebar';
import Notifications from '@/components/profile/Notifications';
import Messages from '@/components/profile/Messages';
import Hours from '@/components/profile/Hours';
import Events from '@/components/profile/Events';
import Schedule from '@/components/profile/Schedule';
import Bio from '@/components/profile/Bio';
import Calendar from '@/components/profile/Calendar';

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Hours':
        return <Hours />;
      case 'Schedule':
        return <Schedule />;
      case 'Events':
        return <Events />;
      case 'Messages':
        return <Messages />;
      case 'Notifications':
        return <Notifications />;
      case 'Chat':
        return <Messages />;
      default:
        return <Bio />;
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
              <Sidebar setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
