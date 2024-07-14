// products page
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/products/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Starters from '@/components/products/Starters';
import Entrees from '@/components/products/Entrees';
import Desserts from '@/components/products/Desserts';
import Bevearges from '@/components/products/Beverages';
import GiftCards from '@/components/products/GiftCards';
import Form from '@/components/products/Form';
import NewItems from '@/components/products/NewItems';
// chart imports

import MonthlyChart from '@/components/charts/MonthlyChart';
import HourlyChart from '@/components/charts/HourlyChart';
import DailyChart from '@/components/charts/DailyChart';
import WeeklyChart from '@/components/charts/WeeklyChart';

export default function Products() {
  const [activeComponent, setActiveComponent] = useState('Products');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Entrees':
        return <Entrees setActiveComponent={setActiveComponent} />;
      case 'Desserts':
        return <Desserts setActiveComponent={setActiveComponent} />;
      case 'Beverages':
        return <Bevearges setActiveComponent={setActiveComponent} />;
      case 'GiftCards':
        return <GiftCards setActiveComponent={setActiveComponent} />;
      case 'Form':
        return <Form setActiveComponent={setActiveComponent} />;
      case 'NewItems':
        return <NewItems setActiveComponent={setActiveComponent} />;
      // chart analytics
      case 'HourlyChart':
        return <HourlyChart setActiveComponent={setActiveComponent} />;
      case 'DayilyChart':
        return <DailyChart setActiveComponent={setActiveComponent} />;
      case 'WeeklytChart':
        return <WeeklyChart setActiveComponent={setActiveComponent} />;
      case 'MonthlyChart':
        return <MonthlyChart setActiveComponent={setActiveComponent} />;
      default:
        return <Starters setActiveComponent={setActiveComponent} />;
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
