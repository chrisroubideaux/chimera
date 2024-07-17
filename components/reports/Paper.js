// Spreadsheet component

export default function Paper({ setActiveComponent }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h4 className="my-1">Paper</h4>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="text-sm-end d-flex justify-content-end">
                <div className="dropdown me-2">
                  <button
                    className="btn btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    View by
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('Today')}
                      >
                        Today
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('Weekly')}
                      >
                        Weekly
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('Hourly')}
                      >
                        Hour
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('Monthly')}
                      >
                        Monthly
                      </a>
                    </li>
                  </ul>
                </div>
                <button type="button" className="btn btn-sm ">
                  <i className="fa-solid fa-plus"></i> New Product
                </button>
              </div>
            </div>
            <div className="container mt-5">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Qaunity</th>
                      <th>Sold</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Projected</th>
                      <th>Actual</th>
                      <th>Trending</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Paper</td>
                      <td>Produce</td>
                      <th>30 cases</th>
                      <td>50 cases</td>
                      <td>3:00pm</td>
                      <td>7/20/24</td>
                      <td>60 cases</td>
                      <td>55 cases</td>
                      <td>Up</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
