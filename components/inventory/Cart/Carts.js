// Cart component

export default function Carts() {
  return (
    <div className="">
      <div className="">
        <div>
          <div className="container">
            <div class="row">
              <div class="col-lg-8 col-md-7">
                <div class="py-3">
                  <div class="alert alert-danger p-2" role="alert">
                    You’ve got FREE delivery. Start
                    <a href="#!" class="alert-link">
                      checkout now!
                    </a>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item py-3 py-lg-0 px-0 card">
                      <div class="row align-items-center">
                        <div class="col-3 col-md-2">
                          <img
                            src="../../assets/images/products/product-img-2.jpg"
                            alt="Ecommerce"
                            class="img-fluid"
                          />
                        </div>
                        <div class="col-4 col-md-5">
                          <a href="shop-single.html" class="text-inherit">
                            <h6 class="mb-0">NutriChoice Digestive </h6>
                          </a>
                          <span>
                            <small class="text-muted">250g</small>
                          </span>

                          <div class="mt-2 small lh-1">
                            <a
                              href="#!"
                              class="text-decoration-none text-inherit"
                            >
                              <span class="me-1 align-text-bottom">
                                <i class=" fs-6 fa-solid fa-trash"></i>
                              </span>
                              <span class="text-muted">Remove</span>
                            </a>
                          </div>
                        </div>

                        <div class="col-3 col-md-3 col-lg-2">
                          <div class="input-group input-spinner  ">
                            <input
                              type="button"
                              value="-"
                              class="button-minus  btn  btn-sm "
                              data-field="quantity"
                            />
                            <input
                              type="number"
                              step="1"
                              max="999"
                              value="1"
                              name="quantity"
                              className="quantity-input"
                              readOnly
                            />
                            <input
                              type="button"
                              value="+"
                              class="button-plus btn btn-sm "
                              data-field="quantity"
                            />
                          </div>
                        </div>

                        <div class="col-2 text-lg-end text-start text-md-end col-md-2">
                          <span class="fw-bold text-danger">$20.00</span>
                          <div class="text-decoration-line-through text-muted small">
                            $26.00
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div class="d-flex justify-content-between mt-4">
                    <a href="#!" class="btn btn-sm">
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-12 col-lg-4 col-md-5">
                <div class="mb-5 card mt-6 mt-3">
                  <div class="card-body p-6 ">
                    <h2 class="h5 mb-4">Summary</h2>
                    <div class="card mb-2">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div>Item Subtotal</div>
                          </div>
                          <span>$70.00</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div>Service Fee</div>
                          </div>
                          <span>$3.00</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div class="fw-bold">Subtotal</div>
                          </div>
                          <span class="fw-bold">$67.00</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-grid mb-1 mt-4">
                      <button
                        class="btn btn-md d-flex justify-content-between align-items-center"
                        type="submit"
                      >
                        Go to Checkout <span class="fw-bold">$67.00</span>
                      </button>
                    </div>

                    <p>
                      <small>
                        By placing your order, you agree to be bound by the
                        Freshcart <a href="#!">Terms of Service</a>
                        and <a href="#!">Privacy Policy.</a>{' '}
                      </small>
                    </p>

                    <div class="mt-8">
                      <h2 class="h5 mb-3">Add Promo or Gift Card</h2>
                      <form>
                        <div class="mb-2">
                          <label for="giftcard" class="form-label sr-only">
                            Email address
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="giftcard"
                            placeholder="Promo or Gift Card"
                          />
                        </div>

                        <div class="d-grid">
                          <button type="submit" class="btn btn-md mb-1">
                            Redeem
                          </button>
                        </div>
                        <p class="text-muted mb-0">
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
      </div>
    </div>
  );
}

{
  /*
export default function Carts() {
  return (
    <>
      <div className="">
        <div>
          <div className="container">
            <div class="row">
              <div class="col-lg-8 col-md-7">
                <div class="py-3">
                  <div class="alert alert-danger p-2" role="alert">
                    You’ve got FREE delivery. Start
                    <a href="#!" class="alert-link">
                      checkout now!
                    </a>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item py-3 py-lg-0 px-0">
                      <div class="row align-items-center">
                        <div class="col-3 col-md-2">
                          <img
                            src="../../assets/images/products/product-img-2.jpg"
                            alt="Ecommerce"
                            class="img-fluid"
                          />
                        </div>
                        <div class="col-4 col-md-5">
                          <a href="shop-single.html" class="text-inherit">
                            <h6 class="mb-0">NutriChoice Digestive </h6>
                          </a>
                          <span>
                            <small class="text-muted">250g</small>
                          </span>

                          <div class="mt-2 small lh-1">
                            <a
                              href="#!"
                              class="text-decoration-none text-inherit"
                            >
                              <span class="me-1 align-text-bottom">
                                <i class=" fs-6 fa-solid fa-trash"></i>
                              </span>
                              <span class="text-muted">Remove</span>
                            </a>
                          </div>
                        </div>

                        <div class="col-3 col-md-3 col-lg-2">
                          <div class="input-group input-spinner  ">
                            <input
                              type="button"
                              value="-"
                              class="button-minus  btn  btn-sm "
                              data-field="quantity"
                            />
                            <input
                              type="number"
                              step="1"
                              max="999"
                              //  value={quantity}
                              name="quantity"
                              className="quantity-input"
                              readOnly
                            />
                            <input
                              type="button"
                              value="+"
                              class="button-plus btn btn-sm "
                              data-field="quantity"
                            />
                          </div>
                        </div>

                        <div class="col-2 text-lg-end text-start text-md-end col-md-2">
                          <span class="fw-bold text-danger">$20.00</span>
                          <div class="text-decoration-line-through text-muted small">
                            $26.00
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div class="d-flex justify-content-between mt-4">
                    <a href="#!" class="btn btn-md">
                      Continue Shopping
                    </a>
                    <a href="#!" class="btn btn-md">
                      Update Cart
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-12 col-lg-4 col-md-5">
                <div class="mb-5 card mt-6">
                  <div class="card-body p-6">
                    <h2 class="h5 mb-4">Summary</h2>
                    <div class="card mb-2">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div>Item Subtotal</div>
                          </div>
                          <span>$70.00</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div>Service Fee</div>
                          </div>
                          <span>$3.00</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                            <div class="fw-bold">Subtotal</div>
                          </div>
                          <span class="fw-bold">$67.00</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-grid mb-1 mt-4">
                      <button
                        class="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
                        type="submit"
                      >
                        Go to Checkout <span class="fw-bold">$67.00</span>
                      </button>
                    </div>

                    <p>
                      <small>
                        By placing your order, you agree to be bound by the
                        Freshcart <a href="#!">Terms of Service</a>
                        and <a href="#!">Privacy Policy.</a>{' '}
                      </small>
                    </p>

                    <div class="mt-8">
                      <h2 class="h5 mb-3">Add Promo or Gift Card</h2>
                      <form>
                        <div class="mb-2">
                          <label for="giftcard" class="form-label sr-only">
                            Email address
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="giftcard"
                            placeholder="Promo or Gift Card"
                          />
                        </div>

                        <div class="d-grid">
                          <button
                            type="submit"
                            class="btn btn-outline-dark mb-1"
                          >
                            Redeem
                          </button>
                        </div>
                        <p class="text-muted mb-0">
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
      </div>
    </>
  );
}
*/
}
