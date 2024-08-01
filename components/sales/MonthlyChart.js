// Monthly Sales chart

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    datalabels: {
      display: true,
      align: 'end',
      anchor: 'end',
      formatter: (value) => `${value}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value}k`;
        },
      },
    },
  },
};

// Original labels and data
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
];

const originalData = {
  labels,
  datasets: [
    {
      label: 'Projected',
      data: [180, 200, 190, 190, 200, 215, 220, 250],
      borderColor: 'rgb(126, 142, 241)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Actual',
      data: [230, 240, 195, 200, 210, 230, 240, 260],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// Monthly averages data
const averageData = {
  labels,
  datasets: [
    {
      label: 'Monthly Average',
      data: [200, 210, 205, 205, 215, 225, 230, 255], // Example average data
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      type: 'line', // Adding this dataset as a line type
      tension: 0.1, // Optional: Smooth the line
    },
  ],
};

export default function MonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);
  }, []);

  // Combine original data with average data
  const combinedData = {
    labels,
    datasets: [...originalData.datasets, ...averageData.datasets],
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-1">Monthly Sales:</h5>
                <p>{currentDate}</p>
              </span>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={combinedData} />
        </div>
      </div>
    </div>
  );
}
