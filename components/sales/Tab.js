// Tab component
import Link from 'next/link';
import { format } from 'date-fns';
//import Bookings from '../calendar/Bookings';

export default function Tab({ setActiveComponent, admins }) {
  const today = format(new Date(), 'MM/dd/yyyy');
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
          <form className="d-flex" style={{ width: '10rem' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="dash-daterange"
                value={today}
                readOnly
              />
              <button className="input-group-text bg-sm">
                <i className="social-icon fa-solid fa-calendar-days"></i>
              </button>
            </div>
          </form>
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('HourlyChart')}
                >
                  Hourly
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('DailyChart')}
                >
                  Daily
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('WeeklyChart')}
                >
                  Weekly
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('MonthlyChart')}
                >
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
              Category
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('StarterDailyChart')}
                >
                  Appeitizers
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('EntreeDailyChart')}
                >
                  Entrees
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('DessertsDailyChart')}
                >
                  Desserts
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setActiveComponent('BeverageDailyChart')}
                >
                  Bar
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item me-2">
          <Link className="btn btn-sm" href="/dashboard/dashboard">
            Dashboard
            <i className="m-1 fa-solid fa-chart-column"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
