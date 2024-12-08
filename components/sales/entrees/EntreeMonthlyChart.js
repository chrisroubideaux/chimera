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
import { format } from 'date-fns';
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
      formatter: (value) => {
        const formattedValue = Math.round(value / 1000);
        return `${formattedValue}k`;
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${Math.round(value / 1000)}k`;
        },
      },
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

const generateMonthlyData = (months, currentMonth) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  months.forEach((month, idx) => {
    const isCurrentMonth = month === allLabels[currentMonth];
    const daysInMonth = new Date(
      new Date().getFullYear(),
      currentMonth + 1,
      0
    ).getDate();
    const multiplier = isCurrentMonth ? new Date().getDate() / daysInMonth : 1;

    const projected = faker.datatype.number({
      min: 95000 * multiplier,
      max: 105000 * multiplier,
    });
    const actual = faker.datatype.number({
      min: 95000 * 0.95 * multiplier,
      max: 105000 * 1.05 * multiplier,
    });
    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function EntreeMonthlyChart({ setActiveComponent }) {
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
    const months = [];

    for (let i = 7; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(allLabels[monthIndex]);
    }

    const { projectedSales, actualSales, averageSales } = generateMonthlyData(
      months,
      currentMonth
    );

    setChartData({ projectedSales, actualSales, averageSales });
  }, []);

  const generateCSV = () => {
    const headers = [
      'Month',
      'Projected Sales',
      'Actual Sales',
      'Average Sales',
    ];

    // Format numbers with "k" notation
    const formatNumber = (value) => {
      return `${(value / 1000).toFixed(1)}k`; // Shows 1 decimal place
    };

    const rows = chartData.projectedSales.map((_, index) => [
      allLabels.slice(
        (new Date().getMonth() - 7 + 12) % 12,
        ((new Date().getMonth() - 7 + 12) % 12) + 8
      )[index],
      formatNumber(chartData.projectedSales[index]),
      formatNumber(chartData.actualSales[index]),
      formatNumber(chartData.averageSales[index]),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'monthly_sales_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const data = {
    labels: allLabels.slice(
      (new Date().getMonth() - 7 + 12) % 12,
      ((new Date().getMonth() - 7 + 12) % 12) + 8
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
                <h5 className="mb-0 me-1">Entrees:</h5>
                <p>{currentDate}</p>
              </span>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm me-2" onClick={generateCSV}>
                  Export CSV
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
      formatter: (value) => {
        const formattedValue = Math.round(value / 1000);
        return `${formattedValue}k`;
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${Math.round(value / 1000)}k`;
        },
      },
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

// Adjusted function to generate monthly sales data
const generateMonthlyData = (months, currentMonth) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  months.forEach((month, idx) => {
    const isCurrentMonth = month === allLabels[currentMonth];
    const daysInMonth = new Date(
      new Date().getFullYear(),
      currentMonth + 1,
      0
    ).getDate();
    const multiplier = isCurrentMonth ? new Date().getDate() / daysInMonth : 1;

    const projected = faker.datatype.number({
      min: 95000 * multiplier, // Adjusted for closer match
      max: 105000 * multiplier, // Adjusted for closer match
    });
    const actual = faker.datatype.number({
      min: 95000 * 0.95 * multiplier, // Adjusted for closer match
      max: 105000 * 1.05 * multiplier, // Adjusted for closer match
    });
    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function EntreeMonthlyChart({ setActiveComponent }) {
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
    const months = [];

    for (let i = 7; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(allLabels[monthIndex]);
    }

    const { projectedSales, actualSales, averageSales } = generateMonthlyData(
      months,
      currentMonth
    );

    setChartData({ projectedSales, actualSales, averageSales });
  }, []);

  const data = {
    labels: allLabels.slice(
      (new Date().getMonth() - 7 + 12) % 12,
      ((new Date().getMonth() - 7 + 12) % 12) + 8
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
                <h5 className="mb-0 me-1">Entrees:</h5>
                <p>{currentDate}</p>
              </span>
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
