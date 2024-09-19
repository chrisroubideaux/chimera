// Sidebar component
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ setActiveComponent, employees }) {
  return (
    <div className="d-flex flex-column p-4 gap-4 py-md-3">
      <div className="card mb-5">
        <div className="card-body">
          <div className="d-none d-lg-block mb-5">
            <div className="avatar avatar-xxl avatar-circle mb-3">
              <Image
                className="small-avatar"
                src={employees.image}
                width={60}
                height={60}
                alt=""
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Verified user"
              />
            </div>
            <h4 className="card-title mb-0">{employees.name}</h4>
            <p className="card-text small">{employees.email}</p>
            <span className="text-cap">
              <h4>Account</h4>
            </span>
            <ul className=" nav nav-sm nav-tabs nav-vertical mb-4">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveComponent('Bio')}
                >
                  <i className="fs-6 fa-solid fa-person"></i> Bio
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveComponent('Notifications')}
                >
                  <i className="fs-6 fa-solid fa-bell"></i> Notifications
                  <span className="badge bg-soft-dark text-dark rounded-pill nav-link-badge">
                    1
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveComponent('Security')}
                >
                  <i className="fs-6 fa-solid fa-shield"></i> Security
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveComponent('Team')}
                >
                  <i className="fs-6 fa-solid fa-users"></i> Team
                </a>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/">
                  <i className="fs-6 fa-solid fa-person-walking"></i> Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
