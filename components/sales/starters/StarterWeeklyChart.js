// Weekly Sales chart
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import Nav from './Nav';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { startOfWeek, endOfWeek, format, getDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Utility function to format numbers as "1.5k"
const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
};

// Function to generate weekly sales data with adjustments
const generateWeeklySalesData = (weeklyTotal, days = 7) => {
  const dailyAverage = weeklyTotal / days;
  return Array.from({ length: days }, () => {
    const variance = faker.datatype.float({
      min: -dailyAverage * 0.2,
      max: dailyAverage * 0.2,
    }); // Random variance +/- 20% of daily average
    return dailyAverage + variance;
  });
};

// Set specific weekly sales values
const currentWeekSalesTotal = 8500; // 8.5k
const previousWeekSalesTotal = 8900; // 8.9k
const weeklyAverageSales = 8800; // 8.8k

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');
  const [currentDay, setCurrentDay] = useState(new Date().getDay()); // Get current day (0=Sunday, 1=Monday, ..., 6=Saturday)

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  // Generate weekly sales data
  const allDaysSales = generateWeeklySalesData(currentWeekSalesTotal);
  const currentWeekSales = allDaysSales.slice(0, currentDay + 1); // Slice data to include up to current day
  const previousWeekSales = generateWeeklySalesData(previousWeekSalesTotal);
  const averageData = generateWeeklySalesData(weeklyAverageSales);

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
            return `$${formatNumber(context.raw)}`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value) {
          return formatNumber(value);
        },
        color: 'black',
        font: {
          weight: 'normal',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${formatNumber(value)}`;
          },
        },
      },
    },
  };

  const lineChartData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        label: `Current Week $${formatNumber(currentWeekSalesTotal)}`,
        data: [
          ...currentWeekSales,
          ...Array(6 - currentWeekSales.length).fill(null),
        ], // Fill the rest with null to avoid display issues
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgba(177, 188, 255, 0.5)',
        fill: false,
      },
      {
        label: `Previous Week $${formatNumber(previousWeekSalesTotal)}`,
        data: previousWeekSales,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: `Average $${formatNumber(weeklyAverageSales)}`,
        data: averageData,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex">
                <h5 className="mb-0 me-1">Starters:</h5>
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
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import Nav from './Nav';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { startOfWeek, endOfWeek, format, getDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Utility function to format numbers as "1.5k"
const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
};

// Function to generate weekly sales data with adjustments for the current week
const generateWeeklySalesData = (weeklyTotal, currentDay) => {
  const days = 6; // Number of days in the week
  const dailyAverage = weeklyTotal / days;

  // Create data with adjusted values for days that have not yet occurred
  return Array.from({ length: days }, (_, index) => {
    const dayOfWeek = (index + 1) % 7; // Mapping index to day of week (Monday is 1, Sunday is 0)
    const isFutureDay = dayOfWeek > currentDay;
    const variance = faker.datatype.float({
      min: -dailyAverage * 0.2,
      max: dailyAverage * 0.2,
    }); // Random variance +/- 20% of daily average
    return isFutureDay ? dailyAverage * 0.5 : dailyAverage + variance;
  });
};

// Set specific weekly sales values
const currentWeekSalesTotal = 8500; // 8.5k
const previousWeekSalesTotal = 8900; // 8.9k
const weeklyAverageSales = 8800; // 8.8k

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');
  const [currentDay, setCurrentDay] = useState(new Date().getDay()); // Get current day (0=Sunday, 1=Monday, ..., 6=Saturday)

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  // Generate weekly sales data based on current day
  const currentWeekSales = generateWeeklySalesData(
    currentWeekSalesTotal,
    currentDay
  );
  const previousWeekSales = generateWeeklySalesData(
    previousWeekSalesTotal,
    currentDay
  );
  const averageData = generateWeeklySalesData(weeklyAverageSales, currentDay);

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
            return `$${formatNumber(context.raw)}`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value) {
          return formatNumber(value);
        },
        color: 'black',
        font: {
          weight: 'normal',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${formatNumber(value)}`;
          },
        },
      },
    },
  };

  const lineChartData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        label: `Current Week $${formatNumber(currentWeekSalesTotal)}`,
        data: currentWeekSales,
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgba(177, 188, 255, 0.5)',
        fill: false,
      },
      {
        label: `Previous Week $${formatNumber(previousWeekSalesTotal)}`,
        data: previousWeekSales,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: `Average $${formatNumber(weeklyAverageSales)}`,
        data: averageData,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex">
                <h5 className="mb-0 me-1">Starters:</h5>
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
