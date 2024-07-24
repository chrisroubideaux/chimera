// Entree component
const Entrees = ({ setActiveComponent, entrees }) => {
  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Entrees</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end ">
                  <button type="button" className="btn btn-sm me-2">
                    <i className="fa-solid fa-download"></i> Export
                  </button>
                  <a
                    type="button"
                    className="btn btn-sm"
                    href="#"
                    onClick={() => setActiveComponent('Form')}
                  >
                    <i className="fa-solid fa-plus"></i> New Product
                  </a>
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
                          htmlFor="datatables-products-check-all"
                        ></label>
                      </div>
                    </th>
                    <th className="align-middle">Category</th>
                    <th className="align-middle">Item Name</th>
                    <th className="align-middle">Count</th>
                    <th className="align-middle">Par</th>
                    <th className="align-middle">Price</th>
                    <th className="align-middle">Rating</th>
                    <th className="align-middle text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entrees.map((entree) => (
                    <tr key={entree.id}>
                      <td>
                        <div className="form-check fs-4">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label"></label>
                        </div>
                      </td>
                      <td className="d-flex align-items-center">
                        <div className="p-2 rounded bg-body-tertiary d-flex justify-content-center align-items-center me-2 w-50px h-50px">
                          <img
                            src={entree.image}
                            className="mw-100 mh-100"
                            alt={entree.name}
                          />
                        </div>
                        <p className="mb-0">
                          <h5>{entree.category}</h5>
                        </p>
                      </td>
                      <td>{entree.name}</td>
                      <td>{entree.count}</td>
                      <td>{entree.par}</td>
                      <td>${entree.price}</td>
                      <td>
                        <i className="fa-solid fa-star text-warning"></i> 4.6{' '}
                        <span className="text-muted">out of 55 Reviews</span>
                      </td>
                      <td className="text-end">
                        <button type="button" className="btn btn-light">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
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

export default Entrees;

{
  /*
const Entrees = ({ setActiveComponent }) => {
  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Entrees</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end ">
                  <button type="button" className="btn btn-sm me-2">
                    <i className="fa-solid fa-download"></i> Export
                  </button>
                  <a
                    type="button"
                    className="btn btn-sm"
                    href="#"
                    onClick={() => setActiveComponent('Form')}
                  >
                    <i className="fa-solid fa-plus"></i> New Product
                  </a>
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
                    <th className="align-middle">Category</th>
                    <th className="align-middle">Item Name</th>
                    <th className="align-middle">Count</th>
                    <th className="align-middle">Par</th>
                    <th className="align-middle">Price</th>

                    <th className="align-middle">Rating</th>
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
                    <td className="d-flex align-items-center">
                      <div className="p-2 rounded bg-body-tertiary d-flex justify-content-center align-items-center me-2 w-50px h-50px">
                        <img
                          src="img/products/product-9.png"
                          className="mw-100 mh-100"
                          alt=""
                        />
                      </div>
                      <p className="mb-0">
                        <h5>Entree</h5>
                        <br />
                      </p>
                    </td>
                    <td>Steak</td>
                    <td>7</td>
                    <td>8</td>
                    <td>$ 38</td>
                    <td>
                      <i className="fa-solid fa-star text-warning"></i> 4.6{' '}
                      <span className="text-muted">out of 55 Reviews</span>
                    </td>
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

export default Entrees;
*/
}
