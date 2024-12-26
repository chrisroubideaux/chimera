// Cart form for produce

export default function Carts() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-8 col-md-7">
          <div className="py-3">
            <div className="alert alert-danger p-2" role="alert">
              You’ve got FREE delivery. Start{' '}
              <a href="#!" className="alert-link">
                checkout now!
              </a>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item py-3 py-lg-0 px-0 border-top">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src="../../assets/images/products/product-img-1.jpg"
                      alt="Ecommerce"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-4 col-md-5">
                    <a href="shop-single.html" className="text-inherit">
                      <h6 className="mb-0">Haldiram's Sev Bhujia</h6>
                    </a>
                    <span>
                      <small className="text-muted">.98 / lb</small>
                    </span>
                    <div className="mt-2 small lh-1">
                      <a
                        href="#!"
                        className="text-decoration-none text-inherit"
                      >
                        <span className="me-1 align-text-bottom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 text-success"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
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
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        step="1"
                        max="10"
                        value="1"
                        name="quantity"
                        className="quantity-field form-control-sm form-input"
                      />
                      <input
                        type="button"
                        value="+"
                        className="button-plus btn btn-sm"
                        data-field="quantity"
                      />
                    </div>
                  </div>
                  <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                    <span className="fw-bold">$5.00</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item py-3 py-lg-0 px-0">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src="../../assets/images/products/product-img-2.jpg"
                      alt="Ecommerce"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-4 col-md-5">
                    <a href="shop-single.html" className="text-inherit">
                      <h6 className="mb-0">NutriChoice Digestive</h6>
                    </a>
                    <span>
                      <small className="text-muted">250g</small>
                    </span>
                    <div className="mt-2 small lh-1">
                      <a
                        href="#!"
                        className="text-decoration-none text-inherit"
                      >
                        <span className="me-1 align-text-bottom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 text-success"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
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
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        step="1"
                        max="10"
                        value="1"
                        name="quantity"
                        className="quantity-field form-control-sm form-input"
                      />
                      <input
                        type="button"
                        value="+"
                        className="button-plus btn btn-sm"
                        data-field="quantity"
                      />
                    </div>
                  </div>
                  <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                    <span className="fw-bold text-danger">$20.00</span>
                    <div className="text-decoration-line-through text-muted small">
                      $26.00
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item py-3 py-lg-0 px-0">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src="../../assets/images/products/product-img-3.jpg"
                      alt="Ecommerce"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-4 col-md-5">
                    <a href="shop-single.html" className="text-inherit">
                      <h6 className="mb-0">Cadbury 5 Star Chocolate</h6>
                    </a>
                    <span>
                      <small className="text-muted">1 kg</small>
                    </span>
                    <div className="mt-2 small lh-1">
                      <a
                        href="#!"
                        className="text-decoration-none text-inherit"
                      >
                        <span className="me-1 align-text-bottom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 text-success"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
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
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        step="1"
                        max="10"
                        value="1"
                        name="quantity"
                        className="quantity-field form-control-sm form-input"
                      />
                      <input
                        type="button"
                        value="+"
                        className="button-plus btn btn-sm"
                        data-field="quantity"
                      />
                    </div>
                  </div>
                  <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                    <span className="fw-bold">$15.00</span>
                    <div className="text-decoration-line-through text-muted small">
                      $20.00
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item py-3 py-lg-0 px-0">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src="../../assets/images/products/product-img-4.jpg"
                      alt="Ecommerce"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-4 col-md-5">
                    <a href="shop-single.html" className="text-inherit">
                      <h6 className="mb-0">Tata Tea Premium</h6>
                    </a>
                    <span>
                      <small className="text-muted">100g</small>
                    </span>
                    <div className="mt-2 small lh-1">
                      <a
                        href="#!"
                        className="text-decoration-none text-inherit"
                      >
                        <span className="me-1 align-text-bottom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 text-success"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
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
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        step="1"
                        max="10"
                        value="1"
                        name="quantity"
                        className="quantity-field form-control-sm form-input"
                      />
                      <input
                        type="button"
                        value="+"
                        className="button-plus btn btn-sm"
                        data-field="quantity"
                      />
                    </div>
                  </div>
                  <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                    <span className="fw-bold">$12.00</span>
                    <div className="text-decoration-line-through text-muted small">
                      $16.00
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between">
                <p className="small">Subtotal</p>
                <p className="small fw-bold">$42.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="small">Discount</p>
                <p className="small text-danger fw-bold">- $8.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="small">Shipping</p>
                <p className="small">Free</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="small">Total</p>
                <p className="small fw-bold">$34.00</p>
              </div>
              <button type="button" className="btn btn-primary w-100 py-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
