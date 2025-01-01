// Order details component
import { useState, useEffect } from 'react';

export default function OrderDetails({ setActiveComponent, selectedProduce }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
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
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedItems = cartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  return (
    <div className="">
      <div className="card shadow-sm">
        <h5 className="px-4 py-3 mb-0 border-bottom">Order Details</h5>
        <ul className="list-group">
          {cartItems.length > 0 ? (
            <>
              {paginatedItems.map((item) => (
                <li key={item._id} className="list-group-item px-4 py-3">
                  <div className="row align-items-center g-2">
                    <div className="col-6 col-md-5">
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted d-block">
                        {item.weight}
                      </small>
                      <a
                        href="#!"
                        className="text-decoration-none small mt-1 d-block"
                        onClick={() => handleRemove(item._id)}
                      >
                        <i className="fa-solid fa-trash me-1"></i> Remove
                      </a>
                    </div>

                    <div className="col-4 col-md-4 d-flex justify-content-center">
                      <div
                        className="input-group input-spinner"
                        style={{ maxWidth: '120px' }}
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item._id, 'decrease')
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="form-control text-center px-0"
                          style={{ width: '50px' }}
                          readOnly
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item._id, 'increase')
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-2 col-md-3 text-end">
                      <span className="fw-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <div className="text-decoration-line-through text-muted small">
                            ${item.originalPrice.toFixed(2)}
                          </div>
                        )}
                    </div>
                  </div>
                </li>
              ))}

              <li className="list-group-item px-4 py-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Item Subtotal</div>
                  <div className="fw-bold">
                    ${calculateTotalPrice().toFixed(2)}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    Service Fee
                    <i
                      className="feather-icon icon-info text-muted"
                      data-bs-toggle="tooltip"
                      title="Default tooltip"
                    ></i>
                  </div>
                  <div className="fw-bold">$3.00 Fee waved!</div>
                </div>
              </li>
              <li className="list-group-item px-4 py-3">
                <div className="d-flex align-items-center justify-content-between fw-bold">
                  <div>Subtotal</div>
                  <div>${calculateTotalPrice().toFixed(2)}</div>
                </div>
              </li>
            </>
          ) : (
            <li className="list-group-item">Your cart is empty.</li>
          )}
        </ul>

        {cartItems.length > itemsPerPage && (
          <div className="mt-3 d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`nav-item ${
                      currentPage === index + 1 ? 'active' : ''
                    }`}
                  >
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /*
// Order details component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderDetails({ setActiveComponent, selectedProduce }) {
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

  return (
    <div className="">
      <div className="card shadow-sm">
        <h5 className="px-4 py-3 mb-0 border-bottom">Order Details</h5>
        <ul className="list-group">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <li key={item._id} className="list-group-item px-4 py-3">
                  <div className="row align-items-center g-2">
                    <div className="col-6 col-md-5">
                      <a
                        href="shop-single.html"
                        className="text-inherit text-truncate"
                      >
                        <h6 className="mb-1">{item.name}</h6>
                      </a>
                      <small className="text-muted d-block">
                        {item.weight}
                      </small>
                      <a
                        href="#!"
                        className="text-decoration-none small mt-1 d-block"
                        onClick={() => handleRemove(item._id)}
                      >
                        <i className="fa-solid fa-trash me-1"></i> Remove
                      </a>
                    </div>

                    <div className="col-4 col-md-4 d-flex justify-content-center">
                      <div
                        className="input-group input-spinner"
                        style={{ maxWidth: '120px' }}
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item._id, 'decrease')
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="1"
                          max="999"
                          value={item.quantity}
                          className="form-control text-center px-0"
                          style={{ width: '50px' }}
                          readOnly
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item._id, 'increase')
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-2 col-md-3 text-end">
                      <span className="fw-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <div className="text-decoration-line-through text-muted small">
                            ${item.originalPrice.toFixed(2)}
                          </div>
                        )}
                    </div>
                  </div>
                </li>
              ))}

              <li className="list-group-item px-4 py-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Item Subtotal</div>
                  <div className="fw-bold">
                    ${calculateTotalPrice().toFixed(2)}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    Service Fee
                    <i
                      className="feather-icon icon-info text-muted"
                      data-bs-toggle="tooltip"
                      title="Default tooltip"
                    ></i>
                  </div>
                  <div className="fw-bold">$3.00 Fee waved!</div>
                </div>
              </li>
              <li className="list-group-item px-4 py-3">
                <div className="d-flex align-items-center justify-content-between fw-bold">
                  <div>Subtotal</div>
                  <div>${calculateTotalPrice().toFixed(2)}</div>
                </div>
              </li>
            </>
          ) : (
            <li className="list-group-item">Your cart is empty.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
*/
}
