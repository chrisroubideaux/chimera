// Calendar Tab
import Link from 'next/link';
import CreateEvent from '../calendar/CreateEvent';

const CalendarTab = ({ setActiveComponent }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col"></div>
        </div>
        <ul className="nav">
          <li className="nav-item me-3">
            <div className=" gap-2 justify-content-center">
              <li className="nav-item me-3">
                <div className="gap-2 justify-content-center">
                  <span className="me-2 badge payday text-dark rounded-pill">
                    Payday
                  </span>
                  <span className="me-2 inventory fw-bold text-dark rounded-pill">
                    Meeting
                  </span>
                  <span className="me-2 badge orders text-dark rounded-pill">
                    Orders
                  </span>
                </div>
              </li>
            </div>
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
            <Link className="btn btn-sm" href="/profile/profile">
              Profile
              <i className="m-1 fa-solid fa-person"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default CalendarTab;
