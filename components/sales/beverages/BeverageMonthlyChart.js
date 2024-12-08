// Monthly sales component
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
import Nav from './Nav';

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
          return `${(value / 1000).toFixed(0)}k`;
        },
      },
      max: 50000, // Adjust as necessary
    },
  },
};

const allLabels = [
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
];

const monthlySalesRange = {
  min: 295000 * 0.12,
  max: 295000 * 0.14,
};

// Function to generate monthly sales data
const generateMonthlySalesData = (months, currentMonth, daysInMonth) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  months.forEach((month, idx) => {
    const isCurrentMonth = month === allLabels[currentMonth];
    const multiplier = isCurrentMonth ? new Date().getDate() / daysInMonth : 1;

    const projected = faker.datatype.number({
      min: monthlySalesRange.min * multiplier,
      max: monthlySalesRange.max * multiplier,
    });
    const actual = faker.datatype.number({
      min: monthlySalesRange.min * 0.95 * multiplier,
      max: monthlySalesRange.max * 1.05 * multiplier,
    });
    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function BeverageMonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    const currentMonth = now.getMonth(); // 0 for January, 1 for February, etc.
    const daysInMonth = new Date(
      now.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();
    const months = [];

    for (let i = 7; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(allLabels[monthIndex]);
    }

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateMonthlySalesData(months, currentMonth, daysInMonth);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();
  }, []);

  const data = {
    labels: chartData.projectedSales.map(
      (_, idx) => allLabels[(new Date().getMonth() - 7 + idx + 12) % 12]
    ),
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

  const generateCSV = () => {
    const header = [
      'Month',
      'Projected Sales',
      'Actual Sales',
      'Average Sales',
    ];

    const rows = chartData.projectedSales.map((_, index) => [
      data.labels[index],
      `${(chartData.projectedSales[index] / 1000).toFixed(2)}k`,
      `${(chartData.actualSales[index] / 1000).toFixed(2)}k`,
      `${(chartData.averageSales[index] / 1000).toFixed(2)}k`,
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'monthly_sales_data.csv');
    link.style.visibility = 'hidden';
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
                <h5 className="mb-0 me-1">Beverages:</h5>
                <p>{currentDate}</p>
              </span>
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
import Nav from './Nav';

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
          return `${(value / 1000).toFixed(0)}k`;
        },
      },
      max: 50000, // Adjust as necessary
    },
  },
};

const allLabels = [
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
];

const monthlySalesRange = {
  min: 295000 * 0.12,
  max: 295000 * 0.14,
};

// Function to generate monthly sales data
const generateMonthlySalesData = (months, currentMonth, daysInMonth) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  months.forEach((month, idx) => {
    const isCurrentMonth = month === allLabels[currentMonth];
    const multiplier = isCurrentMonth ? new Date().getDate() / daysInMonth : 1;

    const projected = faker.datatype.number({
      min: monthlySalesRange.min * multiplier,
      max: monthlySalesRange.max * multiplier,
    });
    const actual = faker.datatype.number({
      min: monthlySalesRange.min * 0.95 * multiplier,
      max: monthlySalesRange.max * 1.05 * multiplier,
    });
    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};
const generateCSV = () => {
  const header = ['Month', 'Projected Sales', 'Actual Sales', 'Average Sales'];
  const rows = chartData.projectedSales.map((_, index) => [
    data.labels[index],
    chartData.projectedSales[index].toFixed(0),
    chartData.actualSales[index].toFixed(0),
    chartData.averageSales[index].toFixed(0),
  ]);

  const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'monthly_sales_data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export default function BeverageMonthlyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    const currentMonth = now.getMonth();
    const daysInMonth = new Date(
      now.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();
    const months = [];

    for (let i = 7; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(allLabels[monthIndex]);
    }

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateMonthlySalesData(months, currentMonth, daysInMonth);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();
  }, []);

  const data = {
    labels: chartData.projectedSales.map(
      (_, idx) => allLabels[(new Date().getMonth() - 7 + idx + 12) % 12]
    ),
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

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-1">Beverages:</h5>
                <p>{currentDate}</p>
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
*/
}
