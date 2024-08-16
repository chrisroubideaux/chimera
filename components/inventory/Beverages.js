// Beverage inventory
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import beverages from '@/data/inventory/beverages';

const generateSalesData = (data, minSales, maxSales) => {
  const updatedData = data.map((item) => {
    const sold =
      Math.floor(Math.random() * (maxSales - minSales + 1)) + minSales;
    const projected = item.count;
    const actual = sold;

    // Generate random weekly and monthly sales data
    const WeeklySales = {};
    const MonthlySales = {};

    for (let i = 0; i < 6; i++) {
      const week = `Week ${i + 1}`;
      const month = `Month ${i + 1}`;
      WeeklySales[week] = faker.datatype.number({
        min: minSales,
        max: maxSales,
      });
      MonthlySales[month] = faker.datatype.number({
        min: minSales * 4,
        max: maxSales * 4,
      });
    }

    // Get the current date in MM/DD/YYYY format
    const currentDate = format(new Date(), 'MM/dd/yyyy');

    return {
      ...item,
      sold,
      projected,
      actual,
      WeeklySales,
      MonthlySales,
      date: currentDate,
    };
  });

  return updatedData;
};

export default function Beverages() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const updatedBeverages = generateSalesData(beverages, 1, 10);
    setSalesData(updatedBeverages);
  }, []);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(salesData.length / itemsPerPage)) {
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

  const totalPages = Math.ceil(salesData.length / itemsPerPage);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5 className="my-1">Beverages</h5>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="text-sm-end d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
              </div>
            </div>
            <div className="container mt-1">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>Count</th>
                      <th>Sold</th>
                      <th>Par</th>
                      <th>Projected</th>
                      <th>Actual</th>
                      <th>Date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>${item.price}</td>
                        <td>{item.unit}</td>
                        <td>{item.count}</td>
                        <td>{item.sold}</td>
                        <td>{item.par}</td>
                        <td>{item.projected}</td>
                        <td>{item.actual}</td>
                        <td>{item.date}</td>
                        <td className="text-end">
                          <button type="button" className="btn btn-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
}

{
  /*
import { useState } from 'react';
import beverages from '@/data/inventory/beverages';

export default function Beverages() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Generate sales data for beverages
  const beverages = BeveragesInventory(beverages, 100, 500, 2000);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beverages.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
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
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5 className="my-1 fs-4">Bar</h5>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="text-sm-end d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Count</th>
                  <th>Sold</th>
                  <th>Par</th>
                  <th>Projected</th>
                  <th>Actual</th>
                  <th>Date</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>{item.unit}</td>
                    <td>{item.count}</td>
                    <td>{item.sold}</td>
                    <td>{item.par}</td>
                    <td>{item.projected}</td>
                    <td>{item.sold}</td>
                    <td>{item.date}</td>
                    <td className="text-end">
                      <button type="button" className="btn btn-sm">
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
}

*/
}
