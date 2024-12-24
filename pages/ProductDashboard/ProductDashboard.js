// products page
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/products/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Starters from '@/components/products/Starters';
import Entrees from '@/components/products/Entrees';
import Desserts from '@/components/products/Desserts';
import Beverages from '@/components/products/Beverages';
import GiftCards from '@/components/products/GiftCards';
import Form from '@/components/products/Form';
import EditForms from '@/components/products/EditForms';
import EditBev from '@/components/products/EditBev';
import EditEntree from '@/components/products/EditEntree';
import EditDessert from '@/components/products/EditDessert';
import NewItems from '@/components/products/NewItems';
import Totals from '@/components/charts/Totals';
// chart imports
import MonthlyChart from '@/components/charts/MonthlyChart';
import HourlyChart from '@/components/charts/HourlyChart';
import DailyChart from '@/components/charts/DailyChart';
import WeeklyChart from '@/components/charts/WeeklyChart';

export default function ProductDashboard() {
  const [activeComponent, setActiveComponent] = useState('Products');
  const [admins, setAdmins] = useState([]);
  const [starters, setStarters] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [selectedStarter, setSelectedStarter] = useState(null);
  const [selectedBevereage, setSelectedBevereage] = useState(null);
  const [selectedEntree, setSelectedEntree] = useState(null);
  const [selectedDessert, setSelectedDessert] = useState(null);

  // starters
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/starters')
      .then((response) => {
        setStarters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching starters:', error);
      });
  }, []);
  // entrees
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/entrees')
      .then((response) => {
        setEntrees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching entrees:', error);
      });
  }, []);
  // desserts
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/desserts')
      .then((response) => {
        setDesserts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching desserts:', error);
      });
  }, []);
  // beverages
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/beverages')
      .then((response) => {
        setBeverages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching beverage:', error);
      });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Entrees':
        return (
          <Entrees
            setActiveComponent={setActiveComponent}
            entrees={entrees}
            setSelectedEntree={setSelectedEntree}
          />
        );
      case 'Desserts':
        return (
          <Desserts
            setActiveComponent={setActiveComponent}
            desserts={desserts}
            setSelectedDessert={setSelectedDessert}
          />
        );
      case 'Beverages':
        return (
          <Beverages
            setActiveComponent={setActiveComponent}
            beverages={beverages}
            setSelectedBevereage={setSelectedBevereage}
          />
        );
      case 'GiftCards':
        return <GiftCards setActiveComponent={setActiveComponent} />;
      case 'Form':
        return <Form setActiveComponent={setActiveComponent} />;
      case 'EditForms':
        return (
          <EditForms
            setActiveComponent={setActiveComponent}
            starters={starters}
            selectedStarter={selectedStarter}
          />
        );
      case 'EditBev':
        return (
          <EditBev
            setActiveComponent={setActiveComponent}
            beverages={beverages}
            selectedBevereage={selectedBevereage}
          />
        );
      case 'EditEntree':
        return (
          <EditEntree
            setActiveComponent={setActiveComponent}
            entrees={entrees}
            selectedEntree={selectedEntree}
          />
        );
      case 'EditDessert':
        return (
          <EditDessert
            setActiveComponent={setActiveComponent}
            desserts={desserts}
            selectedDessert={selectedDessert}
          />
        );
      case 'NewItems':
        return <NewItems setActiveComponent={setActiveComponent} />;
      // chart analytics
      case 'HourlyChart':
        return <HourlyChart setActiveComponent={setActiveComponent} />;
      case 'DailyChart':
        return <DailyChart setActiveComponent={setActiveComponent} />;
      case 'WeeklyChart':
        return <WeeklyChart setActiveComponent={setActiveComponent} />;
      case 'MonthlyChart':
        return <MonthlyChart setActiveComponent={setActiveComponent} />;
      default:
        return (
          <Starters
            setActiveComponent={setActiveComponent}
            starters={starters}
            setSelectedStarter={setSelectedStarter}
          />
        );
    }
  };

  return (
    <>
      <Head>
        <title>Products</title>
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
        {/*
        {admins.map((admins) => (
          <Tab
            setActiveComponent={setActiveComponent}
            key={admins.id}
            admins={admins}
          />
        ))}
          */}
        <Tab setActiveComponent={setActiveComponent} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <div className="pt-4">
                <Totals />
              </div>
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
