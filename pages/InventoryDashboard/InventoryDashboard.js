// inventory demo page
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/inventory/Tab';
//import Sidebar from '@/components/admin/Sidebar';
import Totals from '@/components/charts/Totals';
import Produce from '@/components/inventory/Produce';
import Dairy from '@/components/inventory/Dairy';
import Proteins from '@/components/inventory/Proteins';
import Beverages from '@/components/inventory/Beverages';
import Dry from '@/components/inventory/Dry';
import Paper from '@/components/inventory/Paper';
import Linens from '@/components/inventory/Linens';
import Footer from '@/components/Nav/Footer';
import ProduceDetails from '@/components/inventory/produceDetails/ProduceDetails';
import Carts from '@/components/inventory/Cart/Carts';
import Checkout from '@/components/inventory/Cart/Checkout';
import OrderDetails from '@/components/inventory/Cart/OrderDetails';
import Payments from '@/components/inventory/Cart/Payments';
import Success from '@/components/inventory/Cart/Success';

export default function InventoryDashboard() {
  const [activeComponent, setActiveComponent] = useState('Inventory');
  // const [admins, setAdmins] = useState([]);
  const [produce, setProduce] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [linens, setLinens] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [dryGoods, setDryGoods] = useState([]);
  const [paperProducts, setPaperProducts] = useState([]);
  const [selectedProduce, setSelectedProduce] = useState(null);

  // produce
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/produce')
      .then((response) => {
        setProduce(response.data);
      })
      .catch((error) => {
        console.error('Error fetching produce items:', error);
      });
  }, []);

  // dairy inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/dairy')
      .then((response) => {
        setDairy(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dairy items:', error);
      });
  }, []);

  // protein inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/proteins')
      .then((response) => {
        setProteins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching protein items:', error);
      });
  }, []);

  // linen inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/linens')
      .then((response) => {
        setLinens(response.data);
      })
      .catch((error) => {
        console.error('Error fetching linens items:', error);
      });
  }, []);

  // beverage inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/drinks')
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching beverage items:', error);
      });
  }, []);

  // dry goods inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/dryGoods')
      .then((response) => {
        setDryGoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dry good items:', error);
      });
  }, []);

  // paper products inventory
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/paperProducts')
      .then((response) => {
        setPaperProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching paper products items:', error);
      });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dairy':
        return <Dairy setActiveComponent={setActiveComponent} dairy={dairy} />;
      case 'Proteins':
        return (
          <Proteins
            setActiveComponent={setActiveComponent}
            proteins={proteins}
          />
        );
      case 'Beverages':
        return (
          <Beverages setActiveComponent={setActiveComponent} drinks={drinks} />
        );
      case 'Dry':
        return (
          <Dry setActiveComponent={setActiveComponent} dryGoods={dryGoods} />
        );
      case 'Paper':
        return (
          <Paper
            setActiveComponent={setActiveComponent}
            paperProducts={paperProducts}
          />
        );
      case 'Linens':
        return (
          <Linens setActiveComponent={setActiveComponent} linens={linens} />
        );
      case 'ProduceDetails':
        return (
          <ProduceDetails
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );
      case 'Cart':
        return (
          <Carts
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );
      case 'OrderDetails':
        return (
          <OrderDetails
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );
      case 'Checkout':
        return (
          <Checkout
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );
      case 'Payments':
        return (
          <Payments
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );
      case 'Success':
        return (
          <Success
            setActiveComponent={setActiveComponent}
            produce={produce}
            selectedProduce={selectedProduce}
          />
        );

      default:
        return (
          <Produce
            setActiveComponent={setActiveComponent}
            produce={produce}
            setSelectedProduce={setSelectedProduce}
          />
        );
    }
  };
  return (
    <>
      <Head>
        <title>Inventory</title>
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

        {activeComponent !== 'ProduceDetails' &&
          activeComponent !== 'Cart' &&
          activeComponent !== 'Checkout' &&
          activeComponent !== 'Payments' && (
            <Tab setActiveComponent={setActiveComponent} />
          )}
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              {activeComponent !== 'ProduceDetails' &&
                activeComponent !== 'Cart' &&
                activeComponent !== 'Checkout' &&
                activeComponent !== 'Payments' &&
                activeComponent !== 'Success' && (
                  <div className="pt-4">
                    <Totals />
                  </div>
                )}
            </div>
            <div
              className={`col-lg-${
                activeComponent === 'ProduceDetails' ||
                activeComponent === 'Cart' ||
                activeComponent === 'Checkout' ||
                activeComponent === 'OrderDetails' ||
                activeComponent === 'Payments' ||
                activeComponent === 'Success'
                  ? '12'
                  : '8'
              } col-xxl-${
                activeComponent === 'ProduceDetails' ||
                activeComponent === 'Cart' ||
                activeComponent === 'Checkout' ||
                activeComponent === 'OrderDetails' ||
                activeComponent === 'Payments' ||
                activeComponent === 'Success'
                  ? '5'
                  : '6'
              }`}
            >
              <div className="mt-4">{renderComponent()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
