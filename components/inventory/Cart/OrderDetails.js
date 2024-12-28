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
      <ul className="list-group list-group-flush ">
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
                      onClick={() => handleQuantityChange(item._id, 'decrease')}
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
                      onClick={() => handleQuantityChange(item._id, 'increase')}
                    />
                  </div>
                </div>
                <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                  <span className="fw-bold text-danger">
                    ${calculateTotalPrice().toFixed(2)}
                  </span>
                  <div className="text-decoration-line-through text-muted small">
                    ${calculateTotalPrice().toFixed(2)}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">Your cart is empty.</li>
        )}
      </ul>
    </div>
  );
}
