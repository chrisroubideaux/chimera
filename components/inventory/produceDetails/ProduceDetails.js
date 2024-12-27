// Produce details component
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProduceDetails({
  setActiveComponent,
  selectedProduce,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [produce, setProduce] = useState(selectedProduce);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (selectedProduce) {
      setProduce(selectedProduce);
    }
  }, [selectedProduce]);

  if (!produce || Object.keys(produce).length === 0) {
    return <p>No produce data available.</p>;
  }

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
  };

  const handleQuantityChange = (operation) => {
    let updatedQuantity = quantity;
    if (operation === 'increase') {
      updatedQuantity = quantity + 1;
    } else if (operation === 'decrease' && quantity > 1) {
      updatedQuantity = quantity - 1;
    }
    setQuantity(updatedQuantity);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item._id === produce._id);
    if (existingItem) {
      existingItem.quantity = updatedQuantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item._id === produce._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...produce, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart');
  };

  // Calculate total price
  const totalPrice = (produce ? produce.price : 0) * quantity;
  return (
    <div className="mt-4">
      {/*
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <a href="#" onClick={() => setActiveComponent('Produce')}>
                    Inventory
                  </a>
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
      </div>
      */}

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

      {/*section*/}
      <section className="mt-8">
        <div className="container-fluid pt-5">
          <div className="row">
            <div className="col-md-5 col-xl-6">
              <div
                className="product"
                id="product"
                style={{
                  backgroundImage: 'url(../../images/hero/hero4.png)',
                  height: '90vh',
                  backgroundSize: 'cover',
                  borderRadius: '10px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
                }}
              ></div>
              <div className="product-tools pt-4">
                <div className="product" id="product">
                  <div className="thumbnails row g-3" id="productThumbnails">
                    <div className="col-3">
                      <div className="thumbnail">
                        <img
                          src={produce.image || ''}
                          alt={produce.name || 'Produce'}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="thumbnail">
                        <img
                          src={produce.image || ''}
                          alt={produce.name || 'Produce'}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="thumbnail">
                        <img
                          src={produce.image || ''}
                          alt={produce.name || 'Produce'}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="thumbnail">
                        <img
                          src={produce.image || ''}
                          alt={produce.name || 'Produce'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/** */}

            <div className="col-md-7 col-xl-6 ">
              <div className="ps-lg-10 mt-6 mt-md-0 px-5 mx-5">
                <h3 className="mb-4 d-block">
                  {produce ? produce.category : 'Loading...'}
                </h3>
                <h4 className="mb-1">
                  {produce ? produce.name : 'Loading...'}
                </h4>
                <div className="mb-4">
                  <small class="text-warning">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </small>
                  <a href="#" className="ms-2">
                    (30 reviews)
                  </a>
                </div>
                <div className="fs-4">
                  <span className="fw-bold text-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <span className="text-decoration-line-through text-muted">
                    $
                  </span>
                  <span>
                    <small className="fs-6 ms-2 text-danger">5% Off</small>
                  </span>
                </div>
                <hr className="my-6" />
                <div className="mb-5">
                  <button type="button" className="btn btn-md me-2 ">
                    <i className="fa-solid fa-carrot"></i>
                  </button>

                  <button type="button" className="btn btn-md me-2">
                    <i className="fa-solid fa-truck-fast"></i>
                  </button>

                  <button type="button" className="btn btn-md">
                    <i className="fa-solid fa-calendar-days"></i>
                  </button>
                </div>

                <div>
                  <div className="input-group input-spinner">
                    <input
                      type="button"
                      value="-"
                      className="button-minus btn btn-sm"
                      data-field="quantity"
                      onClick={() => handleQuantityChange('decrease')}
                    />
                    <input
                      type="number"
                      step="1"
                      max="999"
                      value={quantity}
                      name="quantity"
                      className="quantity-input"
                      readOnly
                    />
                    <input
                      type="button"
                      value="+"
                      className="button-plus btn btn-sm"
                      data-field="quantity"
                      onClick={() => handleQuantityChange('increase')}
                    />
                  </div>
                </div>
                <div className="mt-3 row justify-content-start g-2 align-items-center">
                  <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
                    <button
                      className="btn btn-sm"
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                      <i className="fs-6 m-1 social-icon fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                  <div className="col-md-4 col-4">
                    <a
                      className="btn btn-sm me-1"
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      aria-label="Compare"
                    >
                      <i class="fa-solid fa-arrows-left-right"></i>
                    </a>
                    <a
                      className="btn btn-sm me-3"
                      href="shop-wishlist.html"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      aria-label="Wishlist"
                    >
                      <i class="fa-solid fa-heart"></i>
                    </a>
                  </div>
                </div>
                <hr className="my-6" />
                <div>
                  <table className="table table-borderless mb-0 bg-transparent mt-4">
                    <tbody>
                      <tr>
                        <td className="bg-transparent">Product Code:</td>
                        <td className="bg-transparent">FBB00255</td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Availability:</td>
                        <td className="bg-transparent">In Stock</td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Category:</td>
                        <td className="bg-transparent">
                          {produce ? produce.category : 'Loading...'}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Unit:</td>
                        <td className="bg-transparent">
                          {produce ? produce.unit : 'Loading...'}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Items per:</td>
                        <td className="bg-transparent">
                          {produce ? produce.perUnit : 'Loading...'}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Weight:</td>
                        <td className="bg-transparent">
                          {produce ? produce.weight : 'Loading...'}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-transparent">Shipping:</td>
                        <td className="bg-transparent">
                          <small className="bg-transparent">
                            01 day shipping.
                            <span class="text-muted bg-transparent">
                              ( Free pickup today)
                            </span>
                          </small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* */}
          </div>
        </div>
      </section>
      {/*** */}

      {/*section*/}
    </div>
  );
}
