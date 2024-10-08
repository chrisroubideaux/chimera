// Tab component

import Link from 'next/link';
import Bookings from '../calendar/Bookings';

const Tab = ({ setActiveComponent, admins }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Employees/Payroll</h3>
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
            <a
              className="btn btn-sm me-1"
              href="#"
              onClick={() => setActiveComponent('Form')}
            >
              <i className="fa-solid fa-plus me-1"></i>Employee
            </a>
          </li>
          <li className="nav-item me-2">
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Payroll
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Payroll')}
                  >
                    Payroll
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('HostsPayroll')}
                  >
                    Host
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('ServersPayroll')}
                  >
                    Servers
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('BarPayroll')}
                  >
                    Bar
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('DishPayroll')}
                  >
                    Dish
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('KitchenPayroll')}
                  >
                    Kitchen
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('ManagersPayroll')}
                  >
                    Managers
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item me-2">
            <Link className="btn btn-sm" href={`/admins/${admins._id}`}>
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
