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

    const currentHour = now.getHours() - 11; // Calculate current hour

    // Ensure current hour is within the chart's hour range
    if (currentHour < 0 || currentHour > 10) return;

    // Generate sales data
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

// Function to generate hourly sales data
const generateHourlySalesData = (min, max) => {
  return Array.from({ length: 11 }, () =>
    faker.datatype.float({ min, max, precision: 0.1 })
  ).map((num) => (num / 1000).toFixed(1));
};

// Function to generate sales data based on current day
const generateSalesData = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)

  // If today is Sunday (dayOfWeek === 0), no sales data
  if (dayOfWeek === 0) {
    return {
      actual: Array(labels.length).fill('0.0'),
      projected: Array(labels.length).fill('0.0'),
    };
  }

  // Generate data for Monday to Saturday
  const actualData = generateHourlySalesData(38.7, 58.7);
  const projectedData = generateHourlySalesData(38.7, 58.7);

  return { actual: actualData, projected: projectedData };
};

const { actual: actualData, projected: projectedData } = generateSalesData();

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: actualData,
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Projected',
      data: projectedData,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Average',
      data: Array(labels.length).fill((48.6 / 1000).toFixed(1)),
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderDash: [5, 5],
    },
  ],
};

export default function BeverageHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
  }, []);

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
