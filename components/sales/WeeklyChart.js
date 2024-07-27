// Weekly sales graph component
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${context.raw.toLocaleString()}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value / 1}k`;
        },
      },
    },
  },
};

const lineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Current Week $75k',
      data: [77, 78, 77, 80, 81, 79, 83],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Previous Week $72k',
      data: [72, 70, 65, 71, 77, 72, 70],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function WeeklyChart({ setActiveComponent }) {
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5>Weekly Sales</h5>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
              </div>
            </div>
          </div>
          <Line
            className="my-2"
            options={lineChartOptions}
            data={lineChartData}
          />
        </div>
      </div>
    </div>
  );
}
