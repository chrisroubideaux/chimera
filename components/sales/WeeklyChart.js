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
          return `${value}k`;
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
  'Sunday',
];

// Function to generate weekly sales data
const generateWeeklySalesData = (averageDailySales) => {
  const days = 7;
  const salesData = [];
  for (let i = 0; i < days; i++) {
    const dailySales = averageDailySales + (Math.random() * 2 - 1);
    salesData.push(parseFloat(dailySales.toFixed(2)));
  }
  return salesData;
};

// Generate current and previous week sales data
const dailyAverageSales = 11.4; // $11,400 daily
const currentWeekSales = generateWeeklySalesData(dailyAverageSales); // Approx $75,000 weekly
const previousWeekSales = generateWeeklySalesData(dailyAverageSales * 0.96); // Approx $72,000 weekly
const averageSales = Array(labels.length).fill(dailyAverageSales); // Average daily sales based on daily $11.4k

const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Current Week $75k',
      data: currentWeekSales,
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Previous Week $72k',
      data: previousWeekSales,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average Sales',
      data: averageSales,
      borderColor: 'rgba(255, 165, 0, 0.7)',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      borderWidth: 2,
      type: 'line',
    },
  ],
};

export default function WeeklyChart({}) {
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
                <h5 className="me-1 mt-1">Weekly:</h5>
                <h6 className="mt-1">{currentWeek}</h6>
              </div>
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
          return `${value}k`;
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
  'Sunday',
];

// Function to generate weekly sales data
const generateWeeklySalesData = (averageDailySales) => {
  const days = 7;
  const salesData = [];
  for (let i = 0; i < days; i++) {
    const dailySales = averageDailySales + (Math.random() * 2 - 1); // Adding some randomness
    salesData.push(parseFloat(dailySales.toFixed(2)));
  }
  return salesData;
};

// Generate current and previous week sales data
const dailyAverageSales = 11.4; // $11,400 daily
const currentWeekSales = generateWeeklySalesData(dailyAverageSales); // Approx $75,000 weekly
const previousWeekSales = generateWeeklySalesData(dailyAverageSales * 0.96); // Approx $72,000 weekly
const averageSales = Array(labels.length).fill(dailyAverageSales); // Average daily sales based on daily $11.4k

const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Current Week $75k',
      data: currentWeekSales,
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Previous Week $72k',
      data: previousWeekSales,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average Sales',
      data: averageSales,
      borderColor: 'rgba(255, 165, 0, 0.7)',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      borderWidth: 2,
      type: 'line',
    },
  ],
};

export default function WeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MMMM dd');
    const formattedEnd = format(end, 'MMMM dd, yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex ">
                <h5 className="mb-0 me-1">Weekly :</h5>
                <p className="mb-0">{currentWeek}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
                <div className="dropdown">
                  <button
                    className="btn btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sales
                  </button>
                </div>
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
