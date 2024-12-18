// Beverages component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const Beverages = ({ setActiveComponent, beverages }) => {
  const [dailySales, setDailySales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });

  const generateDailySalesData = () => {
    const averageDailySales = 1000;
    return beverages.map((beverage) => ({
      ...beverage,
      sales: faker.datatype.float({
        min: averageDailySales / 2,
        max: averageDailySales * 1.5,
        precision: 0.01,
      }),
    }));
  };

  useEffect(() => {
    const salesData = generateDailySalesData();
    setDailySales(salesData);
  }, [beverages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beverages.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = format(now, 'MM/dd/yy');
      const formattedTime = format(now, 'hh:mm:ss a');
      setCurrentDateTime({ date: formattedDate, time: formattedTime });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(beverages.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(beverages.length / itemsPerPage);

  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Beverages</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end">
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
                  <th className="">Item</th>
                  <th className="">Category</th>
                  <th className="">Price</th>
                  <th className="">Count</th>
                  <th className="">Par</th>
                  <th className="">Date</th>
                  <th className="">Time</th>
                  <th className="">Sold</th>
                  <th className="align-middle text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((beverage, index) => (
                  <tr key={beverage.id}>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td className="d-flex align-items-center">
                      <div className="rounded bg-body-tertiary d-flex w-50px h-50px"></div>
                      <p className="mb-0">
                        <td>{beverage.name}</td>
                        <br />
                        <span className="text-muted"></span>
                      </p>
                    </td>
                    <td>{beverage.category}</td>
                    <td>${beverage.price}</td>
                    <td>{beverage.count}</td>
                    <td>{beverage.par}</td>
                    <td>{currentDateTime.date}</td>
                    <td>{currentDateTime.time}</td>
                    <td>${dailySales[index]?.sales?.toFixed(2)}</td>
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
          <nav
            className="d-flex justify-content-center align-items-center"
            aria-label="Page navigation example"
          >
            <ul className="pagination">
              <li className="page-item me-2">
                <a
                  className="nav-link"
                  href="#"
                  aria-label="Previous"
                  onClick={handlePrevPage}
                >
                  <span aria-hidden="true">
                    <i className="fs-6 fa-solid fa-chevron-left"></i>
                  </span>
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item me-2 ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className="page-item me-2">
                <a
                  className="nav-link"
                  href="#"
                  aria-label="Next"
                  onClick={handleNextPage}
                >
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

export default Beverages;
