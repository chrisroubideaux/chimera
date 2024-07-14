// Tab component for
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

export default function Tab({ setActiveComponent }) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 me-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-none d-lg-block">
            <h3 className="fw-normal">Products</h3>
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
              Products
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('Starters')}
                >
                  Starters
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('Entrees')}
                >
                  {'Entrees'}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('Desserts')}
                >
                  Desserts
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('Beverages')}
                >
                  Beverages
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('GiftCards')}
                >
                  Gift Cards
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('NewItems')}
                >
                  Recently Added
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item me-2">
          <Link className="btn btn-sm" href="/orders/orders">
            Orders
            <i className="m-1 fa-solid fa-clipboard-list"></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className="btn btn-sm" href="/admin/admin">
            Admin
            <i className="m-1 fa-solid fa-person"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
