// Daily Sales chart
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
import { format, subDays, getDay } from 'date-fns';
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

const options = {
  plugins: {
    datalabels: {
      color: 'black',
      display: true,
      anchor: 'end',
      align: 'top',
      formatter: (value) => {
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
        }
        return value.toLocaleString();
      },
      font: {
        weight: 'normal',
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Day of the Week',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Revenue',
      },
      ticks: {
        callback: (value) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
          }
          return value.toLocaleString();
        },
        stepSize: 2000,
      },
      min: 0,
      max: 13000,
    },
  },
};

const getLastSixDays = () => {
  const days = [];
  const today = new Date();
  let date = subDays(today, getDay(today) === 0 ? 1 : 0); // Start from Saturday if today is Sunday
  for (let i = 0; days.length < 6; i++) {
    if (getDay(date) !== 0) {
      // Skip Sunday
      days.push(format(date, 'EEEE'));
    }
    date = subDays(date, 1);
  }
  return days.reverse();
};

const generateDailySales = (dailyAverage, variation) => {
  const dailySales = {};
  const today = new Date();
  let daysCounter = 0;
  for (let i = 0; daysCounter < 6; i++) {
    const date = subDays(today, i);
    if (getDay(date) !== 0) {
      // Skip Sunday
      const keyProjected = format(date, 'yyyy-MM-dd') + '-projected';
      const keyActual = format(date, 'yyyy-MM-dd') + '-actual';
      const projected = faker.datatype.number({
        min: dailyAverage - variation,
        max: dailyAverage + variation,
      });
      const actual =
        getDay(date) < getDay(today)
          ? faker.datatype.number({
              min: dailyAverage - variation,
              max: dailyAverage + variation,
            })
          : 0; // No actual sales for today and future days
      dailySales[keyProjected] = projected;
      dailySales[keyActual] = actual;
      daysCounter++;
    }
  }
  return dailySales;
};

export default function DailyChart() {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    labels: getLastSixDays(),
    datasets: [
      {
        label: 'Projected',
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Daily Average',
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line',
        tension: 0.1,
      },
    ],
  });

  const refreshChartData = () => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    const revenueData = generateDailySales(11000, 2000);

    const lastSixDays = getLastSixDays();
    const today = new Date();

    const projectedData = lastSixDays.map((day, index) => {
      let date = subDays(today, 6 - index);
      if (getDay(date) === 0) {
        date = subDays(date, 1);
      }
      const key = format(date, 'yyyy-MM-dd') + '-projected';
      return revenueData[key] || 11000; // Use the daily average for future days
    });

    const actualData = lastSixDays.map((day, index) => {
      let date = subDays(today, 6 - index);
      if (getDay(date) === 0) {
        date = subDays(date, 1);
      }
      const key = format(date, 'yyyy-MM-dd') + '-actual';
      return getDay(date) < getDay(today) ? revenueData[key] : 0; // No actual data for today and future days
    });

    const dailyAverage = 11000;
    const averageData = new Array(6).fill(dailyAverage);

    setChartData({
      labels: lastSixDays,
      datasets: [
        {
          label: 'Projected',
          data: projectedData,
          borderColor: 'rgb(126, 142, 241)',
          backgroundColor: 'rgb(177, 188, 255)',
        },
        {
          label: 'Actual',
          data: actualData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Daily Average',
          data: averageData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          type: 'line',
          tension: 0.1,
        },
      ],
    });
  };

  useEffect(() => {
    refreshChartData();

    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      if (now > midnight) {
        refreshChartData();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-2">Daily:</h5>
                <p className="text-center">{currentDate}</p>
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
import { format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Define the chart options
const options = {
  plugins: {
    datalabels: {
      color: 'black',
      display: true,
      anchor: 'end',
      align: 'top',
      formatter: (value) => {
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
        }
        return value.toLocaleString();
      },
      font: {
        weight: 'normal', 
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Day of the Week',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Revenue',
      },
      ticks: {
        callback: (value) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
          }
          return value.toLocaleString();
        },
        stepSize: 2000, 
      },
      min: 0, // Start from 0
      max: 13000, // Set maximum to 13k
    },
  },
};

// Generate labels for the last 7 days
const getLastSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    days.push(format(date, 'EEEE'));
  }
  return days;
};

// Function to generate daily sales data
const generateDailySales = (dailyAverage, variation) => {
  const dailySales = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, i);
    const keyProjected = format(date, 'yyyy-MM-dd') + '-projected';
    const keyActual = format(date, 'yyyy-MM-dd') + '-actual';
    const projected =
      dailyAverage + Math.round(Math.random() * variation - variation / 2);
    const actual =
      dailyAverage + Math.round(Math.random() * variation - variation / 2);
    dailySales[keyProjected] = projected;
    dailySales[keyActual] = actual;
  }
  return dailySales;
};

export default function DailyChart() {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    labels: getLastSevenDays(),
    datasets: [
      {
        label: 'Projected',
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Daily Average',
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line',
        tension: 0.1,
      },
    ],
  });

  const refreshChartData = () => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    // Generate revenue data
    const revenueData = generateDailySales(11000, 2000); // Adjust variation as needed

    // Get the last 7 days
    const lastSevenDays = getLastSevenDays();
    const today = new Date();

    // Extract daily revenue for the last 7 days
    const projectedData = lastSevenDays.map((day, index) => {
      const date = subDays(today, 6 - index);
      const key = format(date, 'yyyy-MM-dd') + '-projected';
      return revenueData[key] || 0;
    });

    const actualData = lastSevenDays.map((day, index) => {
      const date = subDays(today, 6 - index);
      const key = format(date, 'yyyy-MM-dd') + '-actual';
      return revenueData[key] || 0;
    });

    // Assuming the restaurant is open Mon-Sat (6 days a week)
    const dailyAverage = 11000; // Daily average revenue

    const averageData = new Array(7).fill(dailyAverage);

    setChartData({
      labels: lastSevenDays,
      datasets: [
        {
          label: 'Projected',
          data: projectedData,
          borderColor: 'rgb(126, 142, 241)',
          backgroundColor: 'rgb(177, 188, 255)',
        },
        {
          label: 'Actual',
          data: actualData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Daily Average',
          data: averageData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          type: 'line',
          tension: 0.1,
        },
      ],
    });
  };

  useEffect(() => {
    refreshChartData();

    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      if (now > midnight) {
        refreshChartData();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-2">Daily:</h5>
                <p className="text-center">{currentDate}</p>
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
          <Bar className="" options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}

*/
}
