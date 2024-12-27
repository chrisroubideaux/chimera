// Cart component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Carts({ setActiveComponent, selectedProduce }) {
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

      // Update localStorage and state
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
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Inventory</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li class="breadcrumb-item">
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
              className="btn btn-md custom-tooltip"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              title="View Cart"
              onClick={() => setActiveComponent('Cart')}
            >
              <i className="fs-5 social-icon fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
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
      {/* */}
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div className="py-3">
              <div className="alert alert-danger p-2" role="alert">
                You’ve got FREE delivery. Start
                <a href="#!" className="alert-link">
                  checkout now!
                </a>
              </div>
              <ul className="list-group list-group-flush px-2 mx-2">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item py-3 py-lg-0 px-0 card"
                    >
                      <div className="row align-items-center">
                        <div className="col-3 col-md-2">
                          <img
                            src={
                              item.image ||
                              '../../assets/images/products/product-img-2.jpg'
                            }
                            alt={item.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-4 col-md-5">
                          <a href="shop-single.html" className="text-inherit">
                            <h6 className="mb-0">{item.name}</h6>
                          </a>
                          <span>
                            <small className="text-muted">{item.weight}</small>
                          </span>
                          <div className="mt-2 small lh-1">
                            <a
                              href="#!"
                              className="text-decoration-none text-inherit"
                              onClick={() => handleRemove(item._id)}
                            >
                              <span className="me-1 align-text-bottom">
                                <i className="fs-6 fa-solid fa-trash"></i>
                              </span>
                              <span className="text-muted">Remove</span>
                            </a>
                          </div>
                        </div>
                        <div className="col-3 col-md-3 col-lg-2">
                          <div className="input-group input-spinner">
                            <input
                              type="button"
                              value="-"
                              className="button-minus btn btn-sm"
                              onClick={() =>
                                handleQuantityChange(item._id, 'decrease')
                              }
                            />
                            <input
                              type="number"
                              step="1"
                              max="999"
                              value={item.quantity}
                              className="quantity-input"
                              readOnly
                            />
                            <input
                              type="button"
                              value="+"
                              className="button-plus btn btn-sm"
                              onClick={() =>
                                handleQuantityChange(item._id, 'increase')
                              }
                            />
                          </div>
                        </div>
                        <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                          <span className="fw-bold text-danger">
                            $ $
                            {item.originalPrice
                              ? item.originalPrice.toFixed(2)
                              : 'N/A'}
                          </span>
                          <div className="text-decoration-line-through text-muted small">
                            $ $
                            {item.originalPrice
                              ? item.originalPrice.toFixed(2)
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">Your cart is empty.</li>
                )}
              </ul>

              <div className="d-flex justify-content-between mt-4">
                <a
                  href="#!"
                  className="btn btn-sm"
                  onClick={() => setActiveComponent('Produce')}
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-5">
            <div className="mb-5 card mt-6 mt-3">
              <div className="card-body p-6">
                <h2 className="h5 mb-4">Summary</h2>

                <div className="card mb-2">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="me-auto">
                        <div>Item Subtotal</div>
                      </div>
                      <span>${totalPrice.toFixed(2)}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="me-auto">
                        <div>Service Fee</div>
                      </div>
                      <span>$3.00</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="me-auto">
                        <div className="fw-bold">Subtotal</div>
                      </div>
                      <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
                <div className="d-grid mb-1 mt-4">
                  <button
                    className="btn btn-md d-flex justify-content-between align-items-center"
                    type="submit"
                  >
                    Go to Checkout{' '}
                    <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                  </button>
                </div>

                <p>
                  <small>
                    By placing your order, you agree to be bound by the
                    Freshcart <a href="#!">Terms of Service</a>
                    and <a href="#!">Privacy Policy.</a>{' '}
                  </small>
                </p>

                <div className="mt-8">
                  <h2 className="h5 mb-3">Add Promo or Gift Card</h2>
                  <form>
                    <div className="mb-2">
                      <label htmlFor="giftcard" className="form-label sr-only">
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="giftcard"
                        placeholder="Promo or Gift Card"
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-md mb-1">
                        Redeem
                      </button>
                    </div>
                    <p className="text-muted mb-0">
                      {' '}
                      <small>Terms & Conditions apply</small>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Carts({ setActiveComponent, selectedProduce }) {
  const [isEditing, setIsEditing] = useState(false);
  const [produce, setProduce] = useState(selectedProduce);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Get cart items from localStorage
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

      // Update localStorage and state
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
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Inventory</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li class="breadcrumb-item">
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
              className="btn btn-md custom-tooltip"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              title="View Cart"
              onClick={() => setActiveComponent('Cart')}
            >
              <i className="fs-5 social-icon fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
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

    

      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div className="py-3">
              <div className="alert alert-danger p-2" role="alert">
                You’ve got FREE delivery. Start
                <a href="#!" className="alert-link">
                  checkout now!
                </a>
              </div>

              <ul className="list-group list-group-flush">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item py-3 py-lg-0 px-0 card"
                    >
                      <div className="row align-items-center">
                        <div className="col-3 col-md-2">
                          <img
                            src={
                              item.image ||
                              '../../assets/images/products/product-img-2.jpg'
                            }
                            alt={item.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-4 col-md-5">
                          <a href="shop-single.html" className="text-inherit">
                            <h6 className="mb-0">{item.name}</h6>
                          </a>
                          <span>
                            <small className="text-muted">{item.weight}</small>
                          </span>
                          <div className="mt-2 small lh-1">
                            <a
                              href="#!"
                              className="text-decoration-none text-inherit"
                              onClick={() => handleRemove(item._id)}
                            >
                              <span className="me-1 align-text-bottom">
                                <i className="fs-6 fa-solid fa-trash"></i>
                              </span>
                              <span className="text-muted">Remove</span>
                            </a>
                          </div>
                        </div>
                        <div className="col-3 col-md-3 col-lg-2">
                          <div className="input-group input-spinner">
                            <input
                              type="button"
                              value="-"
                              className="button-minus btn btn-sm"
                              onClick={() =>
                                handleQuantityChange(item._id, 'decrease')
                              }
                            />
                            <input
                              type="number"
                              step="1"
                              max="999"
                              value={item.quantity}
                              className="quantity-input"
                              readOnly
                            />
                            <input
                              type="button"
                              value="+"
                              className="button-plus btn btn-sm"
                              onClick={() =>
                                handleQuantityChange(item._id, 'increase')
                              }
                            />
                          </div>
                        </div>
                        <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                          <span className="fw-bold text-danger">
                            $ $
                            {item.originalPrice
                              ? item.originalPrice.toFixed(2)
                              : 'N/A'}
                          </span>
                          <div className="text-decoration-line-through text-muted small">
                            $ $
                            {item.originalPrice
                              ? item.originalPrice.toFixed(2)
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">Your cart is empty.</li>
                )}
              </ul>

              <div className="d-grid mb-1 mt-4">
                <button
                  className="btn btn-md d-flex justify-content-between align-items-center"
                  type="submit"
                >
                  Go to Checkout{' '}
                  <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                </button>
              </div>

              <p>
                <small>
                  By placing your order, you agree to be bound by the Freshcart{' '}
                  <a href="#!">Terms of Service</a>
                  and <a href="#!">Privacy Policy.</a>{' '}
                </small>
              </p>

              <div className="mt-8">
                <h2 className="h5 mb-3">Add Promo or Gift Card</h2>
                <form>
                  <div className="mb-2">
                    <label htmlFor="giftcard" className="form-label sr-only">
                      Email address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="giftcard"
                      placeholder="Promo or Gift Card"
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-md mb-1">
                      Redeem
                    </button>
                  </div>
                  <p className="text-muted mb-0">
                    {' '}
                    <small>Terms & Conditions apply</small>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
