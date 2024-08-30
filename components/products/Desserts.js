// Dessert component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const Desserts = ({ setActiveComponent, desserts }) => {
  const [dailySales, setDailySales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });

  // Function to generate daily sales data
  const generateDailySalesData = () => {
    const averageDailySales = 500; // You can adjust this value based on your requirements
    return desserts.map((dessert) => ({
      ...dessert,
      sales: faker.datatype.float({
        min: averageDailySales / 2,
        max: averageDailySales * 1.5,
        precision: 0.01,
      }),
    }));
  };

  // Call generateDailySalesData and update dailySales state
  useEffect(() => {
    const salesData = generateDailySalesData();
    setDailySales(salesData);
  }, [desserts]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime({
        date: format(now, 'MM/dd/yyyy'),
        time: format(now, 'hh:mm:ss a'), // 12-hour format with seconds
      });
    };

    // Update the date and time immediately when the component mounts
    updateDateTime();

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Calculates the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = desserts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(desserts.length / itemsPerPage)) {
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

  const totalPages = Math.ceil(desserts.length / itemsPerPage);

  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Desserts</h5>
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
              <table id="datatables-products" className="table w-100 mt-2">
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
                  {currentItems.map((dessert, index) => (
                    <tr key={dessert.id}>
                      <td>
                        <div className="form-check fs-4">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label"></label>
                        </div>
                      </td>
                      <td className="d-flex align-items-center">
                        <div className="rounded bg-body-tertiary d-flex w-50px h-50px"></div>
                        <p className="mb-0">
                          <td>{dessert.name}</td>
                          <br />
                          <span className="text-muted"></span>
                        </p>
                      </td>

                      <td>{dessert.category}</td>
                      <td>${dessert.price}</td>
                      <td>{dessert.count}</td>
                      <td>{dessert.par}</td>
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

export default Desserts;
