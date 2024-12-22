// Starter component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const Starters = ({ setActiveComponent, starters, setSelectedStarter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });
  const [startersWithSales, setStartersWithSales] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = startersWithSales.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  useEffect(() => {
    const generateSales = () => {
      const totalSales = 3000; // Total daily sales
      const proportions = starters.map(() =>
        faker.datatype.number({ min: 1, max: 100 })
      );
      const totalProportions = proportions.reduce((acc, val) => acc + val, 0);

      const startersWithSales = starters.map((starter, index) => {
        const sales = (
          (proportions[index] / totalProportions) *
          totalSales
        ).toFixed(2);
        return {
          ...starter,
          sold: sales, // Adding sales to each starter
        };
      });

      setStartersWithSales(startersWithSales);
    };

    generateSales();
  }, [starters]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(starters.length / itemsPerPage)) {
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

  const totalPages = Math.min(Math.ceil(starters.length / itemsPerPage), 3);

  const handleEdit = (starter) => {
    setActiveComponent('EditForms');
    setSelectedStarter(starter);
  };
  //
  const handleExportCSV = () => {
    const csvHeaders = ['Name', 'Category', 'Price', 'Count', 'Par', 'Sales'];
    const csvRows = startersWithSales.map((starter) => [
      starter.name,
      starter.category,
      starter.price,
      starter.count,
      starter.par,
      starter.sold,
    ]);

    const csvContent = [
      csvHeaders.join(','), // Add headers
      ...csvRows.map((row) => row.join(',')), // Add rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'starters.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Starters</h5>
              </div>
              <div className="col-md-6 col-xl-8">
                <div className="text-sm-end">
                  <button
                    type="button"
                    className="btn btn-sm me-2"
                    onClick={handleExportCSV}
                  >
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
                {currentItems.map((starter) => (
                  <tr key={starter.id}>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td className="d-flex align-items-center">
                      <p className="mb-0">{starter.name}</p>
                    </td>
                    <td>{starter.category}</td>
                    <td>${starter.price}</td>
                    <td>{starter.count}</td>
                    <td>{starter.par}</td>
                    <td>{currentDateTime.date}</td>
                    <td>{currentDateTime.time}</td>
                    <td>${starter.sold}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleEdit(starter)}
                      >
                        Edit
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

export default Starters;

{
  /*
// Starter component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Starters = ({ setActiveComponent, starters, setSelectedStarter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = starters.slice(indexOfFirstItem, indexOfLastItem);

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
    if (currentPage < Math.ceil(starters.length / itemsPerPage)) {
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

  const totalPages = Math.min(Math.ceil(starters.length / itemsPerPage), 3);

  const handleEdit = (starter) => {
    setActiveComponent('EditForms');
    setSelectedStarter(starter);
  };

  return (
    <div>
      <div className="container-fluid p-0 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
                <h5>Starters</h5>
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
                {currentItems.map((starter) => (
                  <tr key={starter.id}>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td className="d-flex align-items-center">
                      <p className="mb-0">{starter.name}</p>
                    </td>
                    <td>{starter.category}</td>
                    <td>${starter.price}</td>
                    <td>{starter.count}</td>
                    <td>{starter.par}</td>
                    <td>{currentDateTime.date}</td>
                    <td>{currentDateTime.time}</td>
                    <td>${starter.sold}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleEdit(starter)}
                      >
                        Edit
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

export default Starters;

  */
}
