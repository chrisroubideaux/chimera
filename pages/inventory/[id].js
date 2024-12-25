{
  /*
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/inventory/Tab';
//import Sidebar from '@/components/admin/Sidebar';
//import Produce from '@/components/inventory/Produce';
import Dairy from '@/components/inventory/Dairy';
import Proteins from '@/components/inventory/Proteins';
import Dry from '@/components/inventory/Dry';
import Paper from '@/components/inventory/Paper';
import Linens from '@/components/inventory/Linens';
import Details from '@/components/inventory/inventoryDetails/Details';

// data imports
export default function Inventory() {
  const router = useRouter();
  const { id } = router.query;
  const [activeComponent, setActiveComponent] = useState('Inventory');
  const [admins, setAdmins] = useState([]);
  const [produce, setProduce] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [linens, setLinens] = useState([]);
  const [drink, setDrink] = useState([]);
  const [dryGoods, setDryGoods] = useState([]);
  const [paperProducts, setPaperProducts] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get('https://chimera-h56c.onrender.com/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  // beverage inventory

  useEffect(() => {
    if (id) {
      const fetchDrinkData = async () => {
        try {
          const response = await axios.get(
            `https://chimera-h56c.onrender.com/drinks/${id}`
          );
          console.log('Bev data:', response.data);
          setDrink(response.data);
        } catch (error) {
          console.error('Error fetching Beverage data:', error);
        }
      };

      fetchDrinkData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchProduceData = async () => {
        try {
          const response = await axios.get(
            `https://chimera-h56c.onrender.com/produce/${id}`
          );
          console.log('Bev data:', response.data);
          setProduce(response.data);
        } catch (error) {
          console.error('Error fetching Beverage data:', error);
        }
      };

      fetchProduceData();
    }
  }, [id]);

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
        {admins.map((admins) => (
          <Tab
            setActiveComponent={setActiveComponent}
            key={admins.id}
            admins={admins}
          />
        ))}
        <div className="container-fluid ">
          <div className="container mt-5 py-4 my-4">
            <hr className="hr w-25 mx-auto pt-5" />
            <div className="row">
              <div className="col-md-6">
                <div className="container">
                  <h3 className="fw-bold me-5 text-center">Product Details</h3>
                </div>
                <div className=" ">
                  <Details drink={drink} produce={produce} />
                </div>
              </div>
              <div className="col-md-6">
                <h3 className="fw-bold text-center">Description</h3>
                <div className="container d-flex justify-content-end fs-6 m-4">
                  {drink && drink.description ? (
                    <p>{drink.description}</p>
                  ) : produce && produce.description ? (
                    <p>{produce.description}</p>
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6">
              <h2 className=" text-center fw-bold">Analytics</h2>
              Test
            </div>
            <div className="col-md-6">
              <h3 className=" text-center fw-bold">Devlivery</h3>
              <div className="d-flex justify-content-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
*/
}
