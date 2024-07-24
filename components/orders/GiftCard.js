// Gift card

const GiftCard = () => {
  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Gift Card Sales</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end ">
                  <button type="button" className="btn btn-sm me-2">
                    <i className="fa-solid fa-download"></i> Export
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
                    <th className="align-middle">Order ID</th>
                    <th className="align-middle">Billing Name</th>
                    <th className="align-middle">Date</th>
                    <th className="align-middle">Total</th>
                    <th className="align-middle">Payment Method</th>
                    <th className="align-middle">Payment Status</th>
                    <th className="align-middle text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td>
                      <strong>#SK01</strong>
                    </td>
                    <td>Tony Sheley</td>
                    <td>July 5, 2023</td>
                    <td>$350 USD</td>
                    <td>
                      <i className=" social-icon fs-6 fa-solid fa-credit-card"></i>{' '}
                      Mastercard
                    </td>
                    <td>
                      <span className="badge badge-subtle-success">Paid</span>
                    </td>
                    <td className="text-end">
                      <button type="button" className="btn btn-md">
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

export default GiftCard;
