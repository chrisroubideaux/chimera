// Tab component for dashboard page
import Link from 'next/link';
import Bookings from '../calendar/Bookings';

export default function Tab({ setActiveComponent }) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 me-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-none d-lg-block">
            <h3 className="fw-normal">Dashboard</h3>
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
          <Link className="btn btn-sm" href="/reports/reports">
            Reports
            <i class="m-1 fa-solid fa-folder-open"></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className="btn btn-sm" href="/inventory/inventory">
            Inventory
            <i className="m-1 fa-solid fa-list-check"></i>
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
