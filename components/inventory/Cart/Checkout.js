// Checkout component
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails';

export default function Checkout({ setActiveComponent, selectedProduce }) {
  const [isEditing, setIsEditing] = useState(false);
  const [produce, setProduce] = useState(selectedProduce);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    updateCartCount(savedCart);
  }, []);

  useEffect(() => {
    if (selectedProduce) {
      setProduce(selectedProduce);
      setQuantity(selectedProduce.quantity || 1);
    }
  }, [selectedProduce]);

  const updateCartCount = (cart) => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduce((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = produce._id;
      await axios.put(`http://localhost:3001/produce/${id}`, produce);
      const updatedProduce = await axios.get(
        `http://localhost:3001/produce/${id}`
      );
      setProduce(updatedProduce.data);
      setIsEditing(false);
      console.log('Produce updated successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Check the console for details.');
    }
  };

  const handleDelete = () => {
    let produceList = JSON.parse(localStorage.getItem('produce')) || [];
    produceList = produceList.filter((item) => item._id !== produce._id);
    localStorage.setItem('produce', JSON.stringify(produceList));
    setActiveComponent(null);
    updateCartCount(cartItems);
  };

  const handleQuantityChange = (id, operation) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item._id === id);

    if (itemIndex >= 0) {
      const item = updatedCart[itemIndex];
      if (operation === 'increase') {
        item.quantity += 1;
      } else if (operation === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCartCount(updatedCart);
    }
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Inventory</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="/InventoryDashboard/InventoryDashboard">Inventory</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Produce</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Add to cart</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <a
              href="#"
              className="btn btn-md custom-tooltip bg-transparent"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              title="View Cart"
              onClick={() => setActiveComponent('Cart')}
            >
              <i className="fs-5 social-icon fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="badge bg-soft-dark text-dark rounded-pill nav-link-badge">
                  {cartCount}
                </span>
              )}
            </a>
          </li>
          <li className="nav-item">
            <button className="btn btn-md bg-transparent" type="button">
              <i className="fs-5 social-icon fa-solid fa-square-poll-horizontal"></i>
            </button>
          </li>
        </ul>
      </div>
      <section class="mb-lg-14 mb-8 mt-8">
        <div class="row">
          <div class="col-12">
            <div>
              <div class="mb-8">
                <h1 class="fw-bold mb-0">Checkout</h1>
              </div>
            </div>
          </div>
        </div>
        {/*** */}
        <div class="row">
          <div className="col-xl-7 col-lg-6 col-md-12">
            <div className="col-xl-6 col-lg-12 col-md-6 col-12 mb-4">
              <div className="card card-body p-6">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="homeRadio"
                    checked
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="homeRadio"
                  >
                    Store
                  </label>
                </div>
                <address>
                  <strong>Jitu Chauhan</strong>
                  <br />
                  4450 North Avenue Oakland,
                  <br />
                  Nebraska, United States,
                  <br />
                  <abbr title="Phone">P: 402-776-1106</abbr>
                </address>
                <span className="text-danger">Default address</span>
              </div>
            </div>
            <hr className="social-icons" />
            <h6>
              <i className="social-icons fs-6 fa-solid fa-feather me-2"></i>
              Delivery times
            </h6>
            <h6 className="me-2">
              <i className="social-icons fs-6 fa-solid fa-calendar me-2"></i>
              Mon, Wed, Fridays
            </h6>
            <h6 className="me-2">
              <i className="social-icons fs-6 fa-solid fa-clock me-2"></i>
              9am 2pm, 8am 2pm, 9am 2pm
            </h6>
          </div>
          <div className="col-md-12 offset-xl-1 col-xl-4 col-lg-6">
            <OrderDetails />
          </div>
        </div>

        {/*** */}
      </section>
      {/* */}
    </div>
  );
}

{
  /*
// Checkout component
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails';

export default function Checkout({ setActiveComponent, selectedProduce }) {
  const [isEditing, setIsEditing] = useState(false);
  const [produce, setProduce] = useState(selectedProduce);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    updateCartCount(savedCart);
  }, []);

  useEffect(() => {
    if (selectedProduce) {
      setProduce(selectedProduce);
      setQuantity(selectedProduce.quantity || 1);
    }
  }, [selectedProduce]);

  const updateCartCount = (cart) => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduce((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = produce._id;
      await axios.put(`http://localhost:3001/produce/${id}`, produce);
      const updatedProduce = await axios.get(
        `http://localhost:3001/produce/${id}`
      );
      setProduce(updatedProduce.data);
      setIsEditing(false);
      console.log('Produce updated successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Check the console for details.');
    }
  };

  const handleDelete = () => {
    let produceList = JSON.parse(localStorage.getItem('produce')) || [];
    produceList = produceList.filter((item) => item._id !== produce._id);
    localStorage.setItem('produce', JSON.stringify(produceList));
    setActiveComponent(null);
    updateCartCount(cartItems);
  };

  const handleQuantityChange = (id, operation) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item._id === id);

    if (itemIndex >= 0) {
      const item = updatedCart[itemIndex];
      if (operation === 'increase') {
        item.quantity += 1;
      } else if (operation === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCartCount(updatedCart);
    }
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Inventory</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="/InventoryDashboard/InventoryDashboard">Inventory</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Produce</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Add to cart</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <a
              href="#"
              className="btn btn-md custom-tooltip bg-transparent"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              title="View Cart"
              onClick={() => setActiveComponent('Cart')}
            >
              <i className="fs-5 social-icon fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="badge bg-soft-dark text-dark rounded-pill nav-link-badge">
                  {cartCount}
                </span>
              )}
            </a>
          </li>
          <li className="nav-item">
            <button className="btn btn-md bg-transparent" type="button">
              <i className="fs-5 social-icon fa-solid fa-square-poll-horizontal"></i>
            </button>
          </li>
        </ul>
      </div>

     
      <section className="mb-lg-14 mb-8 mt-8">
        <div className="row">
        
          <div className="col-xl-8 col-lg-7 col-md-12">
            <div>
              <div className="mb-8">
                <h1 className="fw-bold mb-0">Checkout</h1>
              </div>
            </div>

            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item py-4 bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <a
                    href="#"
                    className="fs-5 text-inherit collapsed h4"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="true"
                    aria-controls="flush-collapseOne"
                  >
                    <i className="social-icons me-2 fa-solid fa-map-pin"></i>
                    Add delivery address
                  </a>

                  <a
                    href="#"
                    className="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#addAddressModal"
                  >
                    Add a new address
                  </a>
                </div>

                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="mt-5">
                    <div className="row">
                      <div className="col-xl-6 col-lg-12 col-md-6 col-12 mb-4">
                        <div className="card card-body p-6">
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="homeRadio"
                              checked
                            />
                            <label
                              className="form-check-label text-dark"
                              htmlFor="homeRadio"
                            >
                              Store
                            </label>
                          </div>

                          <address>
                            <strong>Jitu Chauhan</strong>
                            <br />
                            4450 North Avenue Oakland,
                            <br />
                            Nebraska, United States,
                            <br />
                            <abbr title="Phone">P: 402-776-1106</abbr>
                          </address>
                          <span className="text-danger">Default address</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="social-icons" />
              <h6>
                <i className="social-icons fs-6 fa-solid fa-feather me-2"></i>
                Delivery times
              </h6>
              <h6 className="me-2">
                <i className="social-icons fs-6 fa-solid fa-calendar me-2"></i>
                Mon, Wed, Fridays
              </h6>
              <h6 className="me-2">
                <i className="social-icons fs-6 fa-solid fa-clock me-2"></i>
                9am 2pm, 8am 2pm, 9am 2pm
              </h6>
            </div>
          </div>

        
          <div class="col-md-12 offset-xl-1 col-xl-4 col-lg-6">
            <div className="sticky-top ">
              <OrderDetails />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

*/
}
