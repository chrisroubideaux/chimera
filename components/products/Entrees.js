// Entree component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const Entrees = ({ setActiveComponent, entrees, setSelectedEntree }) => {
  const [dailySales, setDailySales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });

  // Function to generate random daily sales data
  const generateDailySalesData = () => {
    const averageDailySales = 7500; // Total daily sales target
    const totalItems = entrees.length;
    const salesAllocation = averageDailySales / totalItems; // Approximate sales per item

    return entrees.map((entree) => ({
      ...entree,
      sold: faker.datatype.float({
        min: salesAllocation * 0.5, // 50% of average
        max: salesAllocation * 1.5, // 150% of average
        precision: 0.01,
      }),
    }));
  };

  // Call generateDailySalesData and update dailySales state
  useEffect(() => {
    const salesData = generateDailySalesData();
    setDailySales(salesData);
  }, [entrees]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime({
        date: format(now, 'MM/dd/yyyy'),
        time: format(now, 'hh:mm:ss a'),
      });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailySales.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(entrees.length / itemsPerPage)) {
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

  const totalPages = Math.ceil(entrees.length / itemsPerPage);

  const handleEdit = (entree) => {
    setActiveComponent('EditEntree');
    setSelectedEntree(entree);
  };

  const generateCSV = () => {
    const headers = ['Item', 'Category', 'Price', 'Count', 'Par', 'Sold'];
    const rows = dailySales.map((item) => [
      item.name,
      item.category,
      `$${item.price}`,
      item.count,
      item.par,
      `$${item.sold.toFixed(2)}`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `entrees_sales_${new Date().toISOString()}.csv`;
    link.click();
  };

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
                  <button
                    type="button"
                    className="btn btn-sm me-2"
                    onClick={generateCSV}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((entree) => (
                  <tr key={entree.id}>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td>{entree.name}</td>
                    <td>{entree.category}</td>
                    <td>${entree.price}</td>
                    <td>{entree.count}</td>
                    <td>{entree.par}</td>
                    <td>{currentDateTime.date}</td>
                    <td>{currentDateTime.time}</td>
                    <td>${entree.sold.toFixed(2)}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleEdit(entree)}
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

export default Entrees;

{
  /*
// Entree component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const Entrees = ({ setActiveComponent, entrees, setSelectedEntree }) => {
  const [dailySales, setDailySales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });

  // Function to generate random daily sales data
  const generateDailySalesData = () => {
    const averageDailySales = 7500; // Total daily sales target
    const totalItems = entrees.length;
    const salesAllocation = averageDailySales / totalItems; // Approximate sales per item

    return entrees.map((entree) => ({
      ...entree,
      sold: faker.datatype.float({
        min: salesAllocation * 0.5, // 50% of average
        max: salesAllocation * 1.5, // 150% of average
        precision: 0.01,
      }),
    }));
  };

  // Call generateDailySalesData and update dailySales state
  useEffect(() => {
    const salesData = generateDailySalesData();
    setDailySales(salesData);
  }, [entrees]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime({
        date: format(now, 'MM/dd/yyyy'),
        time: format(now, 'hh:mm:ss a'),
      });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailySales.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(entrees.length / itemsPerPage)) {
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

  const totalPages = Math.ceil(entrees.length / itemsPerPage);

  const handleEdit = (entree) => {
    setActiveComponent('EditEntree');
    setSelectedEntree(entree);
  };

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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((entree) => (
                  <tr key={entree.id}>
                    <td>
                      <div className="form-check fs-4">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    <td>{entree.name}</td>
                    <td>{entree.category}</td>
                    <td>${entree.price}</td>
                    <td>{entree.count}</td>
                    <td>{entree.par}</td>
                    <td>{currentDateTime.date}</td>
                    <td>{currentDateTime.time}</td>
                    <td>${entree.sold.toFixed(2)}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleEdit(entree)}
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

export default Entrees;
*/
}
