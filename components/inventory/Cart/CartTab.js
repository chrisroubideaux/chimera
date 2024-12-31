// Cart tab component

export default function CartTab() {
  return (
    <div>
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mt-3 me-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-none d-lg-block">
                <h3 className="fw-normal">Inventory</h3>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="/InventoryDashboard/InventoryDashboard">
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
                  <span className="badge bg-soft-dark text-dark fs-6 rounded-pill nav-link-badge">
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
      </div>
    </div>
  );
}
