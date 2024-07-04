// Sidebar component for profile page
import Link from 'next/link';

export default function Sidebar({ setActiveComponent }) {
  return (
    <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-3 align-items-center justify-content-center">
      <div className="card flex-grow-1 mb-5">
        <div className="card-body">
          <div className="d-none d-lg-block text-center mb-5">
            <div className="avatar avatar-xxl avatar-circle mb-3">
              <img
                className="avatar"
                src="./assets/img/160x160/img9.jpg"
                alt=""
              />
              <img
                className="avatar-status avatar-lg-status"
                src="./assets/svg/illustrations/top-vendor.svg"
                alt=""
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Verified user"
              />
            </div>
            <h4 className="card-title mb-0">Name Here</h4>
            <p className="card-text small">example@example.com</p>
            <span className="text-cap">
              <h4>Account</h4>
            </span>
            <ul className="nav nav-sm nav-tabs nav-vertical mb-4">
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
