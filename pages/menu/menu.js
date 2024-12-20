// menu page
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Header from '@/components/menu/Header';
import Footer from '@/components/Misc/Footer';

export default function menu() {
  return (
    <>
      <Head>
        <title>Chimera || Menu</title>
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
        <Header />
        <Footer />
      </div>
    </>
  );
}
