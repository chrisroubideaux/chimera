// Monthly sales chart
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
import { format, eachMonthOfInterval, getDaysInMonth, getDate } from 'date-fns';
import Nav from './Nav';
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
      formatter: (value) => `${(value / 1000).toFixed(0)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${(value / 1000).toFixed(0)}k`;
        },
      },
      suggestedMax: 30000, // Max value to $30k
    },
  },
};

// Function to generate random monthly sales data
const generateMonthlySalesData = (averageSales, months) => {
  return months.map((_, index) => {
    const isCurrentMonth = index === months.length - 1;
    const daysInMonth = getDaysInMonth(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - months.length + index
      )
    );
    const daysElapsed = isCurrentMonth ? getDate(new Date()) : daysInMonth;
    const averageDailySales = averageSales / daysInMonth;
    const dailySales = averageDailySales * daysElapsed;
    const variance = faker.datatype.float({ min: -2000, max: 2000 }); // Reduced variance range
    return Math.max(0, dailySales + variance);
  });
};

// Function to calculate the sliding window average
const calculateSlidingWindowAverage = (data, windowSize) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const windowData = data.slice(start, i + 1);
    const average =
      windowData.reduce((sum, value) => sum + value, 0) / windowData.length;
    result.push(average);
  }
  return result;
};

// Generate labels for the last 8 months
const months = eachMonthOfInterval({
  start: new Date(new Date().getFullYear(), new Date().getMonth() - 7, 1),
  end: new Date(),
}).map((date) => format(date, 'MMMM yyyy'));

// Define average monthly sales
const averageMonthlySales = 20000; // Adjust this value based on your data

// Generate sales data using faker
const projectedSalesData = generateMonthlySalesData(
  averageMonthlySales,
  months
);
const actualSalesData = generateMonthlySalesData(averageMonthlySales, months);

// Calculate the sliding window averages
const slidingWindowSize = 3;
const projectedSalesSlidingWindow = calculateSlidingWindowAverage(
  projectedSalesData,
  slidingWindowSize
);
const actualSalesSlidingWindow = calculateSlidingWindowAverage(
  actualSalesData,
  slidingWindowSize
);

// Add the average sales line
const chartData = {
  labels: months,
  datasets: [
    {
      label: 'Projected Sales',
      data: projectedSalesSlidingWindow,
      borderColor: 'rgb(126, 142, 241)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Actual Sales',
      data: actualSalesSlidingWindow,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average Sales',
      data: new Array(months.length).fill(averageMonthlySales),
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
    },
  ],
};

export default function DessertsMonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-1">Desserts:</h5>
                <p>{currentDate}</p>
              </span>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={chartData} />
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
import { format, eachMonthOfInterval, getDaysInMonth, getDate } from 'date-fns';
import Nav from './Nav';
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
      formatter: (value) => `${(value / 1000).toFixed(0)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${(value / 1000).toFixed(0)}k`;
        },
      },
      suggestedMax: 30000, // Max value to $30k
    },
  },
};

// Function to generate random monthly sales data
const generateMonthlySalesData = (averageSales, months) => {
  return months.map((_, index) => {
    const isCurrentMonth = index === months.length - 1;
    const daysInMonth = getDaysInMonth(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - months.length + index
      )
    );
    const daysElapsed = isCurrentMonth ? getDate(new Date()) : daysInMonth;
    const averageDailySales = averageSales / daysInMonth;
    const dailySales = averageDailySales * daysElapsed;
    const variance = faker.datatype.float({ min: -5000, max: 5000 });
    return Math.max(0, dailySales + variance);
  });
};

// Function to calculate the sliding window average
const calculateSlidingWindowAverage = (data, windowSize) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const windowData = data.slice(start, i + 1);
    const average =
      windowData.reduce((sum, value) => sum + value, 0) / windowData.length;
    result.push(average);
  }
  return result;
};

// Generate labels for the last 8 months
const months = eachMonthOfInterval({
  start: new Date(new Date().getFullYear(), new Date().getMonth() - 7, 1),
  end: new Date(),
}).map((date) => format(date, 'MMMM yyyy'));

// Define average monthly sales
const averageMonthlySales = 20000; // Adjust this value based on your data

// Generate sales data using faker
const projectedSalesData = generateMonthlySalesData(
  averageMonthlySales,
  months
);
const actualSalesData = generateMonthlySalesData(averageMonthlySales, months);

// Calculate the sliding window averages
const slidingWindowSize = 3;
const projectedSalesSlidingWindow = calculateSlidingWindowAverage(
  projectedSalesData,
  slidingWindowSize
);
const actualSalesSlidingWindow = calculateSlidingWindowAverage(
  actualSalesData,
  slidingWindowSize
);

// Add the average sales line
const chartData = {
  labels: months,
  datasets: [
    {
      label: 'Projected Sales',
      data: projectedSalesSlidingWindow,
      borderColor: 'rgb(126, 142, 241)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Actual Sales',
      data: actualSalesSlidingWindow,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average Sales',
      data: new Array(months.length).fill(averageMonthlySales),
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
    },
  ],
};

export default function DessertsMonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-1">Desserts:</h5>
                <p>{currentDate}</p>
              </span>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}

*/
}
