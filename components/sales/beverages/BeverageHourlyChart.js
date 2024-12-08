// Hourly sales component
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
import { faker } from '@faker-js/faker';

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
      text: 'Hourly Sales Data',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.raw}k`;
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

// Function to generate hourly sales data in the range of 1k to 3k
const generateHourlySalesData = (min, max, currentHour) => {
  return Array.from({ length: labels.length }, (_, index) => {
    if (index > currentHour) return 0;
    const baseSales = faker.datatype.float({ min, max, precision: 0.1 });
    return (baseSales / 1000).toFixed(1);
  });
};

// Function to generate sales data based on current day
const generateSalesData = (currentHour) => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // If today is Sunday (dayOfWeek === 0), no sales data
  if (dayOfWeek === 0) {
    return {
      actual: Array(labels.length).fill('0.0'),
      projected: Array(labels.length).fill('0.0'),
    };
  }

  // Generate data for Monday to Saturday
  const actualData = generateHourlySalesData(1000, 3000, currentHour);
  const projectedData = generateHourlySalesData(1000, 3000, currentHour);

  return { actual: actualData, projected: projectedData };
};

export default function BeverageHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [hourlySalesData, setHourlySalesData] = useState({
    actual: [],
    projected: [],
    average: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);

    const currentHour = now.getHours() - 11;

    if (currentHour < 0 || currentHour > 10) return;

    const { actual, projected } = generateSalesData(currentHour);
    const averageData = Array.from({ length: labels.length }, (_, index) =>
      parseFloat(
        (
          actual.reduce(
            (acc, val, i) => acc + (i <= currentHour ? parseFloat(val) : 0),
            0
          ) /
          (currentHour + 1)
        ).toFixed(1)
      )
    );

    setHourlySalesData({
      actual,
      projected,
      average: averageData,
    });
  }, []);

  const { actual, projected, average } = hourlySalesData;

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual',
        data: actual,
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Projected',
        data: projected,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: average,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };
  ///
  // Function to generate CSV
  const generateCSV = () => {
    const header = ['Hour', 'Actual Sales', 'Projected Sales', 'Average Sales'];
    const rows = labels.map((label, index) => [
      label,
      `${actual[index]}k`,
      `${projected[index]}k`,
      `${average[index]}k`,
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'hourly_sales_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  ///

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Drinks:</h5>
                <p className="mb-0">{currentDateTime}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  onClick={generateCSV}
                >
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>{' '}
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
