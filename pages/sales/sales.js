// sales page
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/sales/Tab';
import Sidebar from '@/components/admin/Sidebar';
// overall revenue imports
import TopSelling from '@/components/sales/TopSelling';
import HourlyChart from '@/components/sales/HourlyChart';
import DailyChart from '@/components/sales/DailyChart';
import WeeklyChart from '@/components/sales/WeeklyChart';
import MonthlyChart from '@/components/sales/MonthlyChart';
// starter charts by category
import StarterDailyChart from '@/components/sales/starters/StarterDailyChart';
import StarterHourlyChart from '@/components/sales/starters/StarterHourlyChart';
import StarterWeeklyChart from '@/components/sales/starters/StarterWeeklyChart';
import StarterMonthlyChart from '@/components/sales/starters/StarterMonthlyChart';
// entree charts by category
import EntreeDailyChart from '@/components/sales/entrees/EntreeDailyChart';
import EntreeHourlyChart from '@/components/sales/entrees/EntreeHourlyChart';
import EntreeWeeklyChart from '@/components/sales/entrees/EntreeWeeklyChart';
import EntreeMonthlyChart from '@/components/sales/entrees/EntreeMonthlyChart';
// desserts charts by category
import DessertsDailyChart from '@/components/sales/desserts/DessertsDailyChart';
import DessertsHourlyChart from '@/components/sales/desserts/DessertsHourlyChart';
import DessertsWeeklyChart from '@/components/sales/desserts/DessertsWeeklyChart';
import DessertsMonthlyChart from '@/components/sales/desserts/DessertsMonthlyChart';
// beverages charts by category
import BeverageDailyChart from '@/components/sales/beverages/BeverageDailyChart';
import BeverageHourlyChart from '@/components/sales/beverages/BeverageHourlyChart';
import BeverageWeeklyChart from '@/components/sales/beverages/BeverageWeeklyChart';
import BeverageMonthlyChart from '@/components/sales/beverages/BeverageMonthlyChart';

// Import the Revenue function

import { generateRawRevenueData } from '@/utils/Revenue';
import StartersRevenue from '@/utils/starters/StartersRevenue';

export default function Sales() {
  const [activeComponent, setActiveComponent] = useState('Sales');
  const [revenueData, setRevenueData] = useState({});
  const [startersRevenue, setStartersRevenue] = useState({});

  useEffect(() => {
    // Fetch and set the revenue data on component mount
    const revenue = generateRawRevenueData(11400, 74000, 299293);
    setRevenueData(revenue);
    // Fetch and set the starters revenue data
    const startersRevenueData = StartersRevenue(
      1000,
      2000,
      5000,
      10000,
      20000,
      40000
    );
    setStartersRevenue(startersRevenueData);
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      // overall revenue

      case 'TopSelling':
        return <TopSelling setActiveComponent={setActiveComponent} />;

      case 'HourlyChart':
        return (
          <HourlyChart
            setActiveComponent={setActiveComponent}
            data={revenueData.hourly}
          />
        );

      case 'DailyChart':
        return (
          <DailyChart
            setActiveComponent={setActiveComponent}
            data={revenueData.daily}
          />
        );

      case 'WeeklyChart':
        return <WeeklyChart setActiveComponent={setActiveComponent} />;

      // starter charts by category
      case 'StarterDailyChart':
        return (
          <StarterDailyChart
            setActiveComponent={setActiveComponent}
            data={startersRevenue}
          />
        );
      case 'StarterHourlyChart':
        return (
          <StarterHourlyChart
            setActiveComponent={setActiveComponent}
            startersRevenue={startersRevenue}
          />
        );
      case 'StarterWeeklyChart':
        return (
          <StarterWeeklyChart
            setActiveComponent={setActiveComponent}
            startersRevenue={startersRevenue}
          />
        );
      case 'StarterMonthlyChart':
        return (
          <StarterMonthlyChart
            setActiveComponent={setActiveComponent}
            startersRevenue={startersRevenue}
          />
        );

      // Entree charts by category
      case 'EntreeDailyChart':
        return <EntreeDailyChart setActiveComponent={setActiveComponent} />;
      case 'EntreeHourlyChart':
        return <EntreeHourlyChart setActiveComponent={setActiveComponent} />;
      case 'EntreeWeeklyChart':
        return <EntreeWeeklyChart setActiveComponent={setActiveComponent} />;
      case 'EntreeMonthlyChart':
        return <EntreeMonthlyChart setActiveComponent={setActiveComponent} />;

      // Dessert charts by category
      case 'DessertsDailyChart':
        return <DessertsDailyChart setActiveComponent={setActiveComponent} />;
      case 'DessertsHourlyChart':
        return <DessertsHourlyChart setActiveComponent={setActiveComponent} />;
      case 'DessertsWeeklyChart':
        return <DessertsWeeklyChart setActiveComponent={setActiveComponent} />;
      case 'DessrtsMonthlyChart':
        return <DessertsMonthlyChart setActiveComponent={setActiveComponent} />;
      // Beverage charts by category
      case 'BeverageDailyChart':
        return <BeverageDailyChart setActiveComponent={setActiveComponent} />;
      case 'BeverageHourlyChart':
        return <BeverageHourlyChart setActiveComponent={setActiveComponent} />;
      case 'BeverageWeeklyChart':
        return <BeverageWeeklyChart setActiveComponent={setActiveComponent} />;
      case 'BeverageMonthlyChart':
        return <BeverageMonthlyChart setActiveComponent={setActiveComponent} />;
      // default
      default:
        return (
          <MonthlyChart
            setActiveComponent={setActiveComponent}
            data={revenueData.monthly}
          />
        );
    }
  };
  return (
    <>
      <Head>
        <title>Sales</title>
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
          <div className="row mt-4">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar setActiveComponent={setActiveComponent} />
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
