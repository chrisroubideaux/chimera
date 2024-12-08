// Weekly Sales chart
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

// Function to generate weekly sales data with randomness
const generateWeeklySalesData = (min, max) => {
  return Array.from({ length: 6 }, () =>
    faker.datatype.float({ min, max, precision: 0.1 })
  );
};

// Function to reset weekly data
const resetWeeklyData = () => {
  // Define ranges for sales
  const min = 1500;
  const max = 2000;
  return {
    currentWeekData: generateWeeklySalesData(min, max),
    previousWeekData: generateWeeklySalesData(min, max),
  };
};

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
          return `$${context.raw}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${value / 1000}k`; // Convert value to thousands
        },
      },
    },
  },
};

// Labels for the chart
const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [previousWeekData, setPreviousWeekData] = useState([]);
  const [averageData, setAverageData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);

    // Generate and set sales data
    const {
      currentWeekData: newCurrentWeekData,
      previousWeekData: newPreviousWeekData,
    } = resetWeeklyData();
    setCurrentWeekData(newCurrentWeekData);
    setPreviousWeekData(newPreviousWeekData);

    // Calculate average sales for the chart
    const average = (data) =>
      data.reduce((acc, val) => acc + val, 0) / data.length;
    setAverageData(
      Array(labels.length).fill(average(newCurrentWeekData).toFixed(1))
    );
  }, []); // Empty dependency array means this effect runs only once, on component mount

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
        data: averageData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderDash: [],
      },
    ],
  };

  // Function to generate CSV from weekly sales data
  const generateCSV = () => {
    const headers = [
      'Day',
      'Current Week Sales',
      'Previous Week Sales',
      'Average Sales',
    ];
    const rows = labels.map((day, index) => [
      day,
      `${(currentWeekData[index] / 1000).toFixed(1)}k`, // Current Week
      `${(previousWeekData[index] / 1000).toFixed(1)}k`, // Previous Week
      `${(averageData[index] / 1000).toFixed(1)}k`, // Average
    ]);

    // Join the headers and rows into CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a link to download the CSV file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `weekly_sales_${new Date().toISOString()}.csv`;

    // Programmatically click the link to trigger the download
    link.click();
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
                <button onClick={generateCSV} className="btn btn-sm me-2">
                  Export CSV
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

// Function to generate weekly sales data with randomness
const generateWeeklySalesData = (min, max) => {
  return Array.from({ length: 6 }, () =>
    faker.datatype.float({ min, max, precision: 0.1 })
  );
};

// Function to reset weekly data
const resetWeeklyData = () => {
  // Define ranges for sales
  const min = 1500;
  const max = 2000;
  return {
    currentWeekData: generateWeeklySalesData(min, max),
    previousWeekData: generateWeeklySalesData(min, max),
  };
};

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
          return `$${context.raw}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${value / 1000}k`; // Convert value to thousands
        },
      },
    },
  },
};

// Labels for the chart
const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
// Function to generate CSV from weekly sales data

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [previousWeekData, setPreviousWeekData] = useState([]);
  const [averageData, setAverageData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);

    // Generate and set sales data
    const {
      currentWeekData: newCurrentWeekData,
      previousWeekData: newPreviousWeekData,
    } = resetWeeklyData();
    setCurrentWeekData(newCurrentWeekData);
    setPreviousWeekData(newPreviousWeekData);

    // Calculate average sales for the chart
    const average = (data) =>
      data.reduce((acc, val) => acc + val, 0) / data.length;
    setAverageData(
      Array(labels.length).fill(average(newCurrentWeekData).toFixed(1))
    );
  }, []); // Empty dependency array means this effect runs only once, on component mount

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
        data: averageData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderDash: [],
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
