// dashboard page
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Card from '@/components/charts/Card';
//import Bookings from '@/components/calendar/Bookings';
import Tab from '@/components/charts/Tab';
import Chart from '@/components/charts/chart';
import DayChart from '@/components/charts/DayChart';
import Revenue from '@/components/charts/Revenue';
import TopSeller from '@/components/charts/TopSeller';
import Totals from '@/components/charts/Totals';
//import Activity from '@/components/messages/Activity';

export default function dashboard() {
  return (
    <>
      <Head>
        <title>dashboard</title>
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
        <div className="container-fluid py-3">
          <Tab />
          {/*revenue cards */}
          <div className="row mt-4">
            <div className="col-lg-6 col-6 col-sm-6 mb-3">
              <Card />
            </div>

            {/*revenue chart */}
            <div className="col-lg-6">
              <div className="">
                <div className="">
                  <Chart />
                </div>
              </div>
            </div>
          </div>
          {/*revenue*/}
          <div className=" py-5">
            <div className="row">
              <div className="col-lg-8 d-flex flex-column justify-content-center">
                <Revenue />
              </div>
              <div className="col-lg-4 d-flex flex-column justify-content-center">
                <div className="">
                  <DayChart />
                </div>
              </div>
            </div>
            {/*sales by hour */}
          </div>
          {/*top sales */}
          <div className="row">
            <div className="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
              <TopSeller />
            </div>
            <div className="col-xl-3 col-lg-6 order-lg-1">
              <Totals />
            </div>
            <div className="col-xl-3 col-lg-6 order-lg-1">test</div>
          </div>
          {/*sales by hour */}
        </div>
      </div>
    </>
  );
}
