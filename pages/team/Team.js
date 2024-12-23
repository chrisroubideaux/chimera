// Team page
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Nav from '@/components/team/Nav';
//import Sidebar from '@/components/admin/Sidebar';
//import Employees from '@/components/team/Employees';
import Card from '@/components/team/Card';
import Hosts from '@/components/team/Hosts';
import Servers from '@/components/team/Servers';
import Bar from '@/components/team/Bar';
import Dish from '@/components/team/Dish';
import Kitchen from '@/components/team/Kitchen';
import Managers from '@/components/team/Managers';
import Form from '@/components/team/Form';

export default function Team() {
  const [activeComponent, setActiveComponent] = useState('Team');
  const [employees, setEmployees] = useState([]);

  // useEffect
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
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
        return (
          <>
            {employees.map((employee) => (
              <Card
                setActiveComponent={setActiveComponent}
                key={employee.id}
                employees={employee}
              />
            ))}
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Team</title>
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

        <div className="container-fluid ">
          <Nav />
          <div className="row row-cols-1 row-cols-1">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
}
