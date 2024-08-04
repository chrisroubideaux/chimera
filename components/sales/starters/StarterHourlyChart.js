// Hourly sales chart
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import Nav from './Nav'; // Corrected file path
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 3,
      barThickness: 30,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          return `${value.toLocaleString()}`;
        },
      },
    },
  },
};

const labels = [
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
];

const projectedData = [
  1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400,
];
const actualData = [
  1350, 1450, 1380, 1400, 1420, 1390, 1410, 1360, 1430, 1370, 1440,
];

// Calculate the average value for the actual and projected data
const averageProjected =
  projectedData.reduce((sum, value) => sum + value, 0) / projectedData.length;
const averageActual =
  actualData.reduce((sum, value) => sum + value, 0) / actualData.length;

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: actualData,
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Projected',
      data: projectedData,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average',
      data: Array(labels.length).fill((averageProjected + averageActual) / 2),
      borderColor: 'rgba(255, 165, 0, 0.7)',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      borderWidth: 2,
      type: 'bar',
    },
  ],
};

export default function StarterHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Starters:</h5>
                <p className="mb-0">{currentDateTime}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
                <Nav setActiveComponent={setActiveComponent} />
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

{
  /*
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import Nav from './Nav';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 3,
      barThickness: 30,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${context.raw}k`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          return `${value}k`;
        },
      },
    },
  },
};

const labels = [
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: [1.5, 1.2, 1.3, 1, 1.1, 1.3, 1.3, 1.2, 1.2, 1.4, 1.2],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Projected',
      data: [1, 1.1, 1.1, 1, 1.4, 1.3, 1.6, 1.4, 1.3, 1.2, 1.1],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function StarterHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Starters:</h5>
                <p className="mb-0">{currentDateTime}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

*/
}
