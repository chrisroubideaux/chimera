// Dish component

const Dish = () => {
  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Dish</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end ">
                  <button type="button" className="btn btn-sm ">
                    <i className="fa-solid fa-plus me-1"></i>Employee
                  </button>
                </div>
              </div>
              <table id="datatables-products" className="table w-100 mt-1">
                <thead>
                  <tr>
                    <th className="align-middle">
                      <div className="form-check fs-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="datatables-products-check-all"
                        />
                        <label
                          className="form-check-label"
                          for="datatables-products-check-all"
                        ></label>
                      </div>
                    </th>
                    <th className="align-middle">Employee</th>
                    <th className="align-middle">Emp ID</th>
                    <th className="align-middle">Phone</th>
                    <th className="align-middle">Role</th>
                    <th className="align-middle">Hired</th>
                    <th className="align-middle">Next Shift</th>
                    <th className="align-middle">Last Active</th>

                    <th className="align-middle text-end">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td className="d-flex align-items-center">
                      <div className="p-2 rounded bg-body-tertiary d-flex justify-content-center align-items-center me-2 w-50px h-50px">
                        <img
                          src="img/products/product-9.png"
                          className="mw-100 mh-100"
                          alt=""
                        />
                      </div>
                      <div className="mb-0">
                        <h6>Name</h6>
                        <br />
                      </div>
                    </td>
                    <td># xxxx</td>
                    <td>xxx-xxx-xxxx</td>
                    <td>Server</td>
                    <td>7/12/23</td>
                    <td>7/31/24</td>
                    <td>34 min ago</td>

                    <td className="text-end">
                      <button type="button" className="btn btn-light">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <nav
            className="d-flex justify-content-center align-items-center"
            aria-label="Page navigation example"
          >
            <ul className="pagination">
              <li className="page-item me-2">
                <a className="nav-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">
                    <i className="fs-6 fa-solid fa-chevron-left"></i>
                  </span>
                </a>
              </li>
              <li className="page-item me-2">
                <a className="nav-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item me-2">
                <a className="nav-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item me-2">
                <a className="nav-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item me-2">
                <a className="nav-link" href="#" aria-label="Next">
                  <span aria-hidden="true">
                    <i className="fs-6 fa-solid fa-chevron-right"></i>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Dish;
