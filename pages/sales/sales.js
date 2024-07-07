// sales page
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/sales/Tab';
import Card from '@/components/charts/Card';
import TopSelling from '@/components/sales/TopSelling';
import Hourly from '@/components/sales/Hourly';
import Daily from '@/components/sales/Daily';
import Weekly from '@/components/sales/Weekly';
import Monthly from '@/components/sales/Monthly';

export default function Sales() {
  const [activeComponent, setActiveComponent] = useState('Sales');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TopSelling':
        return <TopSelling setActiveComponent={setActiveComponent} />;
      case 'Hourly':
        return <Hourly setActiveComponent={setActiveComponent} />;
      case 'Daily':
        return <Daily setActiveComponent={setActiveComponent} />;
      case 'Weekly':
        return <Weekly setActiveComponent={setActiveComponent} />;
      default:
        return <Monthly />;
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
            <div className="col-lg-6 col-6 col-sm-6 mb-3">
              <Card />
            </div>

            {/*revenue chart */}
            <div className="col-lg-6">
              <div className="">
                <div className="">{renderComponent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
