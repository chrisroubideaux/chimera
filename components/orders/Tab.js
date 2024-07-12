// Tab component for orders page
import Link from 'next/link';
import Bookings from '../calendar/Bookings';
const Tab = ({ setActiveComponent }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Orders</h3>
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
                Orders
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Today')}
                  >
                    {"Today's"}
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Yesterday')}
                  >
                    Yesterday
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
                    onClick={() => setActiveComponent('Monthly')}
                  >
                    Monthly
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Refunds')}
                  >
                    Refunds
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item me-2">
            <Link className="btn btn-sm" href="/products/products">
              Products
              <i className="m-1 fa-solid fa-shop"></i>
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
    </>
  );
};
export default Tab;
