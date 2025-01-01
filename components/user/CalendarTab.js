// Tab component
import Link from 'next/link';
import CalendarEvent from './CreateEvent';
import { format } from 'date-fns';

const CalendarTab = ({ setActiveComponent, users, meetings }) => {
  const today = format(new Date(), 'MM/dd/yyyy');
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Calendar</h3>
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
          <li className="nav-item me-3">
            <div className="gap-2 justify-content-center">
              <span className="me-2 badge payroll text-dark rounded-pill">
                Payroll
              </span>
              <span className="me-2 badge payday text-dark rounded-pill">
                Payday
              </span>
              <span className="me-2 inventory fw-bold text-dark rounded-pill">
                Inventory
              </span>
              <span className="me-2 badge orders text-dark rounded-pill">
                Orders
              </span>
            </div>
          </li>
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
            {/* CreateEvent button and modal */}
            <CalendarEvent meetings={meetings} />
          </li>
          <li className="nav-item me-2">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setActiveComponent('Month')}
              >
                Month
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setActiveComponent('Week')}
              >
                Week
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setActiveComponent('Day')}
              >
                Day
              </button>
            </div>
          </li>
          <li className="nav-item me-2">
            <a
              className="btn btn-sm"
              href="#"
              onClick={() => setActiveComponent('Bio')}
            >
              Profile
              <i className="m-1 fa-solid fa-person"></i>
            </a>
          </li>
        </ul>
      </div>

      {/* Display Upcoming Meetings */}
    </>
  );
};

export default CalendarTab;
