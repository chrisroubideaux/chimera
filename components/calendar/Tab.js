// Tab component
import Link from 'next/link';
import CreateEvent from '../calendar/CreateEvent';

const Tab = ({ setActiveComponent, admins, meetings }) => {
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
              <span className="me-1 badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill">
                Payroll
              </span>
              <span className="me-1 badge bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded-pill">
                Inventory
              </span>
              <span className="me-1 badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
                Meetings
              </span>
              <span className="me-1 badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill">
                Orders
              </span>
              <span className="badge bg-info-subtle border border-info-subtle text-info-emphasis rounded-pill">
                Truck
              </span>
            </div>
          </li>
          <li className="nav-item me-2">
            {/* CreateEvent button and modal */}
            <CreateEvent meetings={meetings} />
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
            <Link className="btn btn-sm" href={`/admins/${admins._id}`}>
              Admin
              <i className="m-1 fa-solid fa-person"></i>
            </Link>
          </li>
        </ul>
      </div>

      {/* Display Upcoming Meetings */}
    </>
  );
};

export default Tab;
