// Employee page
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/team/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Employees from '@/components/team/Employees';
import Hosts from '@/components/team/Hosts';
import Servers from '@/components/team/Servers';
import Bar from '@/components/team/Bar';
import Dish from '@/components/team/Dish';
import Kitchen from '@/components/team/Kitchen';
import Managers from '@/components/team/Managers';
import Form from '@/components/team/Form';
// payroll imports
import Payroll from '@/components/payroll/Payroll';
import PayrollForm from '@/components/payroll/PayrollForm';
import HostsPayroll from '@/components/payroll/HostsPayroll';
import ServersPayroll from '@/components/payroll/ServersPayroll';
import BarPayroll from '@/components/payroll/BarPayroll';
import DishPayroll from '@/components/payroll/DishPayroll';
import KitchenPayroll from '@/components/payroll/KitchenPayroll';
import ManagersPayroll from '@/components/payroll/Payroll';

export default function Team() {
  const [activeComponent, setActiveComponent] = useState('Team');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Payroll':
        return <Payroll setActiveComponent={setActiveComponent} />;
      case 'PayrollForm':
        return <PayrollForm setActiveComponent={setActiveComponent} />;
      case 'Hosts':
        return <Hosts setActiveComponent={setActiveComponent} />;
      case 'Servers':
        return <Servers setActiveComponent={setActiveComponent} />;
      case 'Bar':
        return <Bar setActiveComponent={setActiveComponent} />;
      case 'Dish':
        return <Dish setActiveComponent={setActiveComponent} />;
      case 'Kitchen':
        return <Kitchen setActiveComponent={setActiveComponent} />;
      case 'Managers':
        return <Managers setActiveComponent={setActiveComponent} />;
      case 'Form':
        return <Form setActiveComponent={setActiveComponent} />;
      default:
        return <Employees setActiveComponent={setActiveComponent} />;

      // payroll
      case 'HostsPayroll':
        return <HostsPayroll setActiveComponent={setActiveComponent} />;
      case 'ServersPayroll':
        return <ServersPayroll setActiveComponent={setActiveComponent} />;
      case 'BarPayroll':
        return <BarPayroll setActiveComponent={setActiveComponent} />;
      case 'DishPayroll':
        return <DishPayroll setActiveComponent={setActiveComponent} />;
      case 'KitchenPayroll':
        return <KitchenPayroll setActiveComponent={setActiveComponent} />;
      case 'ManagersPayroll':
        return <ManagersPayroll setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <>
      <Head>
        <title>Employees</title>
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
        <div className="container-fluid ">
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
