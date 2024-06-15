// total sales component//
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: '# of Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export default function Totals() {
  return (
    <div className="card">
      <div className="d-flex card-header justify-content-between align-items-center">
        <h6 className="">Total Sales</h6>
        <div className="dropdown">
          <a
            href="#"
            className=""
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a href="javascript:void(0);" className="dropdown-item">
              Sales Report
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Export Report
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Profit
            </a>

            <a href="javascript:void(0);" className="dropdown-item">
              Action
            </a>
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        <div
          id="average-sales"
          className="apex-charts mb-4 mt-2"
          data-colors="#727cf5,#0acf97,#fa5c7c,#ffbc00"
        ></div>
        <Pie data={data} />
        <div className="chart-widget-list">
          <h6 className="me-1">
            <i className="appetizers fa-solid fa-square"></i> Appetizers
            <span className="float-end">$300.56</span>
          </h6>
          <h6>
            <i className="entrees fa-solid fa-square"></i> Entree`s
            <span className="float-end">$135.18</span>
          </h6>
          <h6>
            <i className="desserts fa-solid fa-square"></i> Desserts
            <span className="float-end">$48.96</span>
          </h6>
          <h6>
            <i className="alcohol fa-solid fa-square"></i>Alcohol
            <span className="float-end">$154.02</span>
          </h6>
          <h6>
            <i className="gift-card fa-solid fa-square"></i>Gift Card
            <span className="float-end">$154.02</span>
          </h6>
        </div>
      </div>
    </div>
  );
}
