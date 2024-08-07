// admin page
import { useState } from 'react';
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

export default function Admin() {
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Events':
        return <Chats />;
      case 'Messages':
        return <Messages setActiveComponent={setActiveComponent} />;
      case 'Notifications':
        return <Notifications setActiveComponent={setActiveComponent} />;
      case 'Schedule':
        return <Schedule setActiveComponent={setActiveComponent} />;
      case 'TimeOff':
        return <TimeOff setActiveComponent={setActiveComponent} />;
      default:
        return <Bio />;
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
              <Sidebar setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
