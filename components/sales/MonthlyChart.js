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
import { faker } from '@faker-js/faker';

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
      // Set the maximum value for the y-axis
      min: 0,
      max: 350, // 350k
    },
  },
};

const generateMonthlySales = () => {
  const currentMonth = new Date().getMonth(); // 0-11 (January is 0)
  const monthlyData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Projected',
        data: Array.from({ length: 12 }, (_, i) => {
          // Projected data for months up to the current month
          return i <= currentMonth
            ? faker.datatype.number({ min: 150, max: 300 })
            : 0;
        }),
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: Array.from({ length: 12 }, (_, i) => {
          // Actual data only for past months, with lower values for early August
          return i < currentMonth
            ? faker.datatype.number({ min: 150, max: 300 })
            : i === currentMonth
            ? faker.datatype.number({ min: 50, max: 100 })
            : 0;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Monthly Average',
        data: Array.from({ length: 12 }, () =>
          faker.datatype.number({ min: 150, max: 300 })
        ),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line',
        tension: 0.1,
      },
    ],
  };

  return monthlyData;
};

export default function MonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [filteredData, setFilteredData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    const { labels, datasets } = generateMonthlySales();
    const currentMonth = now.getMonth();

    const filteredLabels = labels.slice(0, currentMonth + 1);
    const filteredDatasets = datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, currentMonth + 1),
    }));

    setFilteredData({ labels: filteredLabels, datasets: filteredDatasets });
  }, []);

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
          <Bar className="" options={options} data={filteredData} />
        </div>
      </div>
    </div>
  );
}

{
  /*
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

// Overall monthly sales array
const monthlySales = [
  {
    type: 'labels',
    data: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  {
    type: 'datasets',
    data: [
      {
        label: 'Projected',
        data: [180, 200, 190, 190, 200, 215, 220, 250, 260, 270, 280, 290],
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: [230, 240, 195, 200, 210, 230, 240, 260, 270, 280, 290, 300],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Monthly Average',
        data: [200, 210, 205, 205, 215, 225, 230, 255, 260, 270, 280, 290],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line',
        tension: 0.1,
      },
    ],
  },
];

export default function MonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [filteredData, setFilteredData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    const currentMonth = now.getMonth(); // 0-11 (January is 0)
    const labels = monthlySales[0].data.slice(0, currentMonth + 1);

    const datasets = monthlySales[1].data.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, currentMonth + 1),
    }));

    setFilteredData({ labels, datasets });
  }, []);

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
          <Bar className="" options={options} data={filteredData} />
        </div>
      </div>
    </div>
  );
}

*/
}
