// Daily Sales chart
import { useState, useEffect, useRef } from 'react';
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
    legend: { position: 'top' },
    datalabels: {
      display: true,
      align: 'end',
      anchor: 'end',
      formatter: (value) => `${(value / 1000).toFixed(1)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => `${(value / 1000).toFixed(1)}k`,
        stepSize: 2000,
      },
      max: 14000,
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
const dailySalesRange = { min: 11000, max: 12000 };

// Function to generate daily sales data
const generateDailySalesData = (currentDayIndex) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  const now = new Date();
  const currentHour = now.getHours();

  labels.forEach((day, index) => {
    const projected = faker.datatype.number({
      min: dailySalesRange.min,
      max: dailySalesRange.max,
    });

    let actual = null;
    if (
      index < currentDayIndex ||
      (index === currentDayIndex && currentHour >= 11 && currentHour <= 21)
    ) {
      actual = faker.datatype.number({
        min: dailySalesRange.min * 0.9,
        max: dailySalesRange.max * 1.1,
      });
    }

    const average = (projected + (actual ?? 0)) / 2;
    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function DailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    setCurrentDate(format(now, 'EEEE, MM/dd/yyyy'));
    const currentDayIndex = now.getDay() - 1;

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateDailySalesData(currentDayIndex);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();

    const timeToMidnight = new Date().setHours(24, 0, 0, 0) - now.getTime();
    const firstInterval = setTimeout(() => {
      updateSalesData();
      const interval = setInterval(updateSalesData, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeToMidnight);

    return () => clearTimeout(firstInterval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Projected',
        data: chartData.projectedSales,
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: chartData.actualSales,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: chartData.averageSales,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  // Helper to generate CSV data
  const generateCSV = () => {
    const headers = ['Day', 'Projected Sales', 'Actual Sales', 'Average Sales'];
    const rows = labels.map((label, index) => [
      label,
      chartData.projectedSales[index] || '',
      chartData.actualSales[index] || '',
      chartData.averageSales[index] || '',
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(',')).join('\n') + '\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sales_report_${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  onClick={generateCSV}
                >
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>
              </div>
            </div>
          </div>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

{
  /*
// Daily Sales chart
import { useState, useEffect, useRef } from 'react';
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
    legend: { position: 'top' },
    datalabels: {
      display: true,
      align: 'end',
      anchor: 'end',
      formatter: (value) => `${(value / 1000).toFixed(1)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => `${(value / 1000).toFixed(1)}k`,
        stepSize: 2000,
      },
      max: 14000,
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
const dailySalesRange = { min: 11000, max: 12000 };

// Function to generate daily sales data
const generateDailySalesData = (currentDayIndex) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  const now = new Date();
  const currentHour = now.getHours();

  labels.forEach((day, index) => {
    const projected = faker.datatype.number({
      min: dailySalesRange.min,
      max: dailySalesRange.max,
    });

    let actual = null;
    if (
      index < currentDayIndex ||
      (index === currentDayIndex && currentHour >= 11 && currentHour <= 21)
    ) {
      actual = faker.datatype.number({
        min: dailySalesRange.min * 0.9,
        max: dailySalesRange.max * 1.1,
      });
    }

    const average = (projected + (actual ?? 0)) / 2;
    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function DailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    setCurrentDate(format(now, 'EEEE, MM/dd/yyyy'));
    const currentDayIndex = now.getDay() - 1;

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateDailySalesData(currentDayIndex);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();

    const timeToMidnight = new Date().setHours(24, 0, 0, 0) - now.getTime();
    const firstInterval = setTimeout(() => {
      updateSalesData();
      const interval = setInterval(updateSalesData, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeToMidnight);

    return () => clearTimeout(firstInterval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Projected',
        data: chartData.projectedSales,
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: chartData.actualSales,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: chartData.averageSales,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  // Helper to generate CSV data
  const generateCSV = () => {
    const headers = ['Day', 'Projected Sales', 'Actual Sales', 'Average Sales'];
    const rows = labels.map((label, index) => [
      label,
      chartData.projectedSales[index] || '',
      chartData.actualSales[index] || '',
      chartData.averageSales[index] || '',
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sales_report_${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  onClick={generateCSV}
                >
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>
              </div>
            </div>
          </div>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
*/
}
