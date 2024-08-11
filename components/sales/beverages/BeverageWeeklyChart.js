// Weekly sales chart
import { useState, useEffect } from 'react';
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
import { startOfWeek, endOfWeek, format } from 'date-fns';
import Nav from './Nav';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate random weekly sales data
const generateWeeklySalesData = (min, max) => {
  return Array.from(
    { length: 6 },
    () => faker.datatype.float({ min, max, precision: 1 }) // Ensure precision is set for better rounding
  );
};

// Generate weekly sales data
const currentWeekData = generateWeeklySalesData(6530, 9808);
const previousWeekData = generateWeeklySalesData(6530, 9808);

const averageSales = (data) =>
  Math.round(data.reduce((acc, val) => acc + val, 0) / data.length);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weekly Sales Data',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${(context.raw / 1000).toFixed(1)}k`; // Format tooltips as "xk"
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          const formattedValue = value / 1000; // Convert to thousands
          // Return formatted value with one decimal place where applicable
          return formattedValue % 1 === 0
            ? `${formattedValue.toFixed(0)}k`
            : `${formattedValue.toFixed(1)}k`;
        },
      },
      min: 6500, // Set minimum value to ensure proper display
      max: 10000, // Set maximum value to ensure proper display
      stepSize: 500, // Set step size for ticks
    },
  },
};

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Current Week',
      data: currentWeekData.map((v) => Math.round(v)), // Convert values to whole numbers
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgba(177, 188, 255, 0.5)',
    },
    {
      label: 'Previous Week',
      data: previousWeekData.map((v) => Math.round(v)), // Convert values to whole numbers
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average',
      data: Array(labels.length).fill(averageSales(currentWeekData)), // Fill with average value
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderDash: [],
    },
  ],
};

export default function BeverageWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex ">
                <h5 className="mb-0 me-1">Drinks:</h5>
                <p className="mb-0">{currentWeek}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
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

{
  /*
import { useState, useEffect } from 'react';
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
import { startOfWeek, endOfWeek, format } from 'date-fns';
import Nav from './Nav';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate random weekly sales data
const generateWeeklySalesData = (min, max) => {
  return Array.from({ length: 6 }, () =>
    faker.datatype.float({ min, max, precision: 0.1 })
  );
};

// Generate weekly sales data
const currentWeekData = generateWeeklySalesData(6530, 9808);
const previousWeekData = generateWeeklySalesData(6530, 9808);

const averageSales = (data) =>
  data.reduce((acc, val) => acc + val, 0) / data.length;

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weekly Sales Data',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${(context.raw / 1000).toFixed(1)}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${(value / 1000).toFixed(1)}k`;
        },
      },
    },
  },
};

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Current Week',
      data: currentWeekData,
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgba(177, 188, 255, 0.5)',
    },
    {
      label: 'Previous Week',
      data: previousWeekData,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average',
      data: Array(labels.length).fill(averageSales(currentWeekData)),
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderDash: [],
    },
  ],
};

export default function BeverageWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex ">
                <h5 className="mb-0 me-1">Beverages:</h5>
                <p className="mb-0">{currentWeek}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
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

*/
}
