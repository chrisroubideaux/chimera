// card component

export default function Card() {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="float-end">
            <i className="mdi widget-icon"></i>
          </div>
          <h5 className="text-muted fw-normal mt-0">Customers</h5>
          <h3 className="mt-3 mb-3">9,210</h3>
          <p className="mb-0 text-muted">
            <span className="me-2">
              <i className="card-icon fa-solid fa-arrow-up"></i>
              544%
            </span>
            <span className="text-nowrap">Last Month</span>
          </p>
        </div>
      </div>
    </div>
  );
}
