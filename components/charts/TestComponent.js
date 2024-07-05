/* test component */

export default function TestComponent() {
  return (
    <div>
      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-6 col-sm-6 mb-3">
              {/*card start */}
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
            <div className="col-6 col-sm-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="float-end">
                    <i className="mdi widget-icon"></i>
                  </div>
                  <h5 className="text-muted fw-normal mt-0">Orders</h5>
                  <h3 className="mt-3 mb-3">8,500</h3>
                  <p className="mb-0 text-muted">
                    <span className="me-2">
                      <i className="card-icon fa-solid fa-arrow-up"></i>
                      400%
                    </span>
                    <span className="text-nowrap">Last Month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="float-end">
                    <i className="mdi widget-icon"></i>
                  </div>
                  <h1 className="text-muted fw-normal mt-0 fs-4">Revenue</h1>
                  <h3 className="mt-3 mb-3">$120K</h3>
                  <p className="mb-0 text-muted">
                    <span className="me-2">
                      <i className="card-icon fa-solid fa-arrow-up"></i>
                      25%
                    </span>
                    <span className="text-nowrap">Last Month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="float-end">
                    <i className="mdi widget-icon"></i>
                  </div>
                  <h5 className="text-muted fw-normal mt-0">Growth</h5>
                  <h3 className="mt-3 mb-3">15%</h3>
                  <p className="mb-0 text-muted">
                    <span className="me-2">
                      <i className="card-icon fa-solid fa-arrow-up"></i>
                      5%
                    </span>
                    <span className="text-nowrap">Last Month</span>
                  </p>
                </div>
              </div>

              {/* card end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
