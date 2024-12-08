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
  return Array.from({ length: 6 }, () =>
    faker.datatype.float({ min, max, precision: 1 })
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
          return `$${(context.raw / 1000).toFixed(1)}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          const formattedValue = value / 1000;
          return formattedValue % 1 === 0
            ? `${formattedValue.toFixed(0)}k`
            : `${formattedValue.toFixed(1)}k`;
        },
      },
      min: 6500, //  Minimum value
      max: 10000, // Maximum value
      stepSize: 500,
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
      data: currentWeekData.map((v) => Math.round(v)),
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgba(177, 188, 255, 0.5)',
    },
    {
      label: 'Previous Week',
      data: previousWeekData.map((v) => Math.round(v)),
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
///
const generateCSV = () => {
  const csvRows = [
    ['Day', 'Current Week Sales', 'Previous Week Sales', 'Average Sales'],
    ...labels.map((label, index) => [
      label,
      `${(currentWeekData[index] / 1000).toFixed(2)}k`,
      `${(previousWeekData[index] / 1000).toFixed(2)}k`,
      `${(averageSales(currentWeekData) / 1000).toFixed(2)}k`,
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'weekly_sales.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

///
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
                <button className="btn btn-sm me-2" onClick={generateCSV}>
                  Download CSV
                </button>
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
