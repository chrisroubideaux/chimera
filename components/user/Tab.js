// Breadcrumb component

export default function Tab({ setActiveComponent, users }) {
  return (
    <div className="mt-2">
      <div className="container content-space-1 content-space-b-lg-3">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h1 className="h2">Personal info</h1>
            </div>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light mb-0">
                <li className="breadcrumb-item">Account</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Personal Info
                </li>
              </ol>
            </nav>
          </div>

          <div className="col-auto">
            <div className="d-none d-lg-block">
              <a
                className="btn btn-soft-light btn-sm m-1"
                href="#"
                onClick={() => setActiveComponent('Notifications')}
              >
                Notifications
                <i className=" m-1 fa-solid fa-bell"></i>
                <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
                  1
                </span>
              </a>

              <a
                className="btn btn-soft-light btn-sm m-1"
                href="#"
                onClick={() => setActiveComponent('Messages')}
              >
                Messages
                <i className="m-1 fa-solid fa-message fs-sm"></i>
              </a>
              <a
                className="btn btn-soft-light btn-sm m-1"
                href="#"
                onClick={() => setActiveComponent('Calendar')}
              >
                Calendar
                <i className=" m-1 fa-solid fa-calendar-plus"></i>
              </a>
            </div>
          </div>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarNav"
            aria-controls="sidebarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-default">
              <i className="fs-6 fa-solid fa-list"></i>
            </span>
            <span className="navbar-toggler-toggled">
              <i className="fs-6 fa-solid fa-x"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
