// Tab component
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

export default function Tab() {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 me-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-none d-lg-block">
            <h3 className="fw-normal">Sale Analytics</h3>
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
              Sale Analytics
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Hourly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Daily
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Weekly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Monthly
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item me-2">
          <div className="dropdown">
            <button
              className="btn btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Reports
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Hourly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Daily
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Weekly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Monthly
                </a>
              </li>
            </ul>
          </div>
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

{
  /*
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

export default function Tab() {
  return (
    <div>
      <ul className="nav justify-content-end mt-3 me-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Library
            </li>
          </ol>
        </nav>
        <li className="nav-item me-2">
          <Bookings />
        </li>
        <li className="nav-item me-2">
          <Link className=" btn btn-sm" href="/admin/admin">
            Admin
            <i className=" m-1 fa-solid fa-person"></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className=" btn btn-sm" href="/admin/admin">
            Admin
            <i className=" m-1 fa-solid fa-person"></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className=" btn btn-sm" href="/admin/admin">
            Admin
            <i className=" m-1 fa-solid fa-person"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

*/
}
