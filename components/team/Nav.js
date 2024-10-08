// Nav for team directory
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

const Tab = ({ setActiveComponent }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Team</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Employees</Link>
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
                Team
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Hosts')}
                  >
                    Hosts
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Servers')}
                  >
                    Servers
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Bar')}
                  >
                    Bar
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Dish')}
                  >
                    Dish
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Kitchen')}
                  >
                    Kitchen
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setActiveComponent('Managers')}
                  >
                    Managment
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item me-2">
            <Link className="btn btn-sm" href="/">
              Home
              <i className="m-1 fa-solid fa-home"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Tab;
