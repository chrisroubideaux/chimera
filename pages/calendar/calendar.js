// calendar page
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Calendar from '@/components/calendar/Calendar';
import Sidebar from '@/components/calendar/Sidebar';
import Tab from '@/components/calendar/Tab';

export default function calendar() {
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

        <Tab />

        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-xxl-9">
              <div className="container">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
