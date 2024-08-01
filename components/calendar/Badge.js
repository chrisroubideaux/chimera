// badge component

export default function Badge() {
  return (
    <div className="d-flex justify-content-between align-items-center me-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-none d-lg-block"></div>
        </div>
      </div>
      <ul className="nav">
        <li className="nav-item me-2">
          <div className=" gap-2 justify-content-center">
            <span className="me-1 badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill">
              Payroll
            </span>
            <span className="me-1 badge bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded-pill">
              Inventory
            </span>
            <span className=" me-1 badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
              Meetings
            </span>

            <span className=" me-1 badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill">
              Food Order
            </span>
            <span className="badge bg-info-subtle border border-info-subtle text-info-emphasis rounded-pill">
              Truck
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
