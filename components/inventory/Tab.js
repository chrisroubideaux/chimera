// Tab component for inventory page
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

const Tab = ({ setActiveComponent }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Inventory</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/admin/admin">Admin</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Library
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item me-2">
            <Bookings />
          </li>
          <li className="nav-item me-2">
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Produce')}
                  >
                    Produce
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Dairy')}
                  >
                    Dairy
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Proteins')}
                  >
                    Proteins
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Beverages')}
                  >
                    Bevearges
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Dry')}
                  >
                    Dry goods
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Paper')}
                  >
                    Paper
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Linens')}
                  >
                    Linens
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item me-2">
            <div className="dropdown me-2">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sale Analytics
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Today')}
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Weekly')}
                  >
                    Weekly
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Hourly')}
                  >
                    Hour
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Monthly')}
                  >
                    Monthly
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {/*
          <li className="nav-item me-2">
            <Link className="btn btn-sm" href="/products/products">
              Products
              <i className="m-1 fa-solid fa-shop"></i>
            </Link>
          </li>
          */}
          <li className="nav-item me-2">
            <Link className="btn btn-sm" href="/admin/admin">
              Admin
              <i className="m-1 fa-solid fa-person"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Tab;
