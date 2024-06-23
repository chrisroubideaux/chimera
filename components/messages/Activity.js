// Recent activity component
export default function Totals() {
  return (
    <div className="card">
      <div className="d-flex card-header justify-content-between align-items-center my-2">
        <h6 className="header-title">Recent Activity</h6>
        <div className="dropdown">
          <a
            href="#"
            className=""
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a href="javascript:void(0);" className="dropdown-item">
              Sales Report
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Export Report
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Profit
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Action
            </a>
          </div>
        </div>
      </div>

      <div
        className="card-body py-0 mb-3"
        data-simplebar
        style={{ minHeight: '430px' }}
      >
        <div className="timeline-alt py-0">
          <div className="timeline-item">
            <div className="d-flex align-items-start">
              <i className="social-icons fa-solid fa-message me-3"></i>
              <div className="timeline-item-info">
                <a
                  href="javascript:void(0);"
                  className="text-info fw-bold  d-block"
                >
                  You have a new message
                </a>
                <small>
                  Paul Burgess just purchased “Hyper - Admin Dashboard”!
                </small>
                <p className="">
                  <small className="text-muted">5 minutes ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
export default function Totals() {
  return (
    <div className="card">
      <div className="d-flex card-header justify-content-between align-items-center">
        <h6 className="header-title">Recent Activity</h6>
      </div>

      <div
        className="card-body py-0 mb-3"
        data-simplebar
        style={{ minHeight: '430px' }}
      >
        <div className="timeline-alt py-0">
          <div className="timeline-item">
            <div className="timeline-item-info">
              <i className=" fa-solid fa-message "></i>
              <a
                href="javascript:void(0);"
                className="text-info fw-bold mb-1 d-block"
              >
                You have a new message
              </a>
              <small>
                Paul Burgess just purchased “Hyper - Admin Dashboard”!
              </small>
              <p className="mb-0 pb-2">
                <small className="text-muted">5 minutes ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

*/
}
