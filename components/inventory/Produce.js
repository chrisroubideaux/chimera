// Produce component inventory
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

export default function Produce({
  setActiveComponent,
  produce,
  setSelectedProduce,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [salesData, setSalesData] = useState([]);

  const generateSalesData = (data) => {
    return data.map((item) => {
      const count = parseInt(item.count, 10);

      const minSales = Math.ceil(count * 0.1);
      const maxSales = count;
      const sold = faker.datatype.number({ min: minSales, max: maxSales });
      const actual = sold;

      return {
        ...item,
        sold,
        projected: count,
        actual,
        date: format(new Date(), 'MM/dd/yyyy'),
      };
    });
  };

  useEffect(() => {
    const updatedProduce = generateSalesData(produce);
    setSalesData(updatedProduce);
  }, [produce]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem);

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

  // CSV Export Functionality
  const handleExportCSV = () => {
    const headers = [
      'Item',
      'Category',
      'Price',
      'Unit',
      'Count',
      'Sold',
      'Par',
      'Projected',
      'Actual',
      'Date',
    ];
    const rows = salesData.map((item) => [
      item.name,
      item.category,
      item.price,
      item.unit,
      item.count,
      item.sold,
      item.par || 'N/A',
      item.projected,
      item.actual,
      item.date,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'produce_inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleEdit = (item) => {
    setActiveComponent('ProduceDetails');
    setSelectedProduce(item);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5 className="my-1">Produce</h5>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="text-sm-end d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  onClick={handleExportCSV}
                >
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
                        <td>{item.par || 'N/A'}</td>
                        <td>{item.projected}</td>
                        <td>{item.actual}</td>
                        <td>{item.date}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => handleEdit(item)}
                          >
                            view
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
