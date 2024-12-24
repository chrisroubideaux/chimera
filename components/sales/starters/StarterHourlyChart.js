// Starters hourly chart
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

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

// Utility function to format numbers as "1.5k"
const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
};

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
    x: {
      ticks: {
        callback: function (value) {
          return formatNumber(value);
        },
      },
      min: 0,
      max: 1600,
    },
  },
};

// Function to generate hourly sales data
const generateHourlySalesData = (
  averageHourlySales,
  openHour,
  closeHour,
  currentHour
) => {
  const hours = labels.length;
  const salesData = [];
  for (let i = 0; i < hours; i++) {
    if (i < openHour || i > closeHour || i > currentHour) {
      salesData.push(0);
    } else {
      const variance = faker.datatype.float({ min: -100, max: 100 });
      const hourlySales = averageHourlySales + variance;
      salesData.push(parseFloat(hourlySales.toFixed(2)));
    }
  }
  return salesData;
};

// Function to generate random projected sales data
const generateRandomProjectedData = (averageHourlySales) => {
  return labels.map(() => {
    const variance = faker.datatype.float({ min: -100, max: 100 });
    return parseFloat((averageHourlySales + variance).toFixed(2));
  });
};

export default function StartersHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);

    const currentHour = now.getHours() - 11;
    const openHour = 0;
    const closeHour = 9;

    const hourlyAverageSales = 1400;

    const actualData = generateHourlySalesData(
      hourlyAverageSales,
      openHour,
      closeHour,
      currentHour
    );

    const projectedData = generateRandomProjectedData(hourlyAverageSales);

    const averageData = labels.map(
      (_, index) => (actualData[index] + projectedData[index]) / 2
    );

    setData({
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
          data: averageData,
          borderColor: 'rgba(255, 165, 0, 0.7)',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderWidth: 2,
          type: 'bar',
        },
      ],
    });
  }, []);
  // Function to generate CSV from sales data
  const generateCSV = () => {
    const headers = [
      'Time',
      'Actual Sales',
      'Projected Sales',
      'Average Sales',
    ];
    const rows = labels.map((time, index) => [
      time,
      `${(data.datasets[0].data[index] / 1000).toFixed(1)}k`,
      `${(data.datasets[1].data[index] / 1000).toFixed(1)}k`,
      `${(data.datasets[2].data[index] / 1000).toFixed(1)}k`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hourly_sales_${new Date().toISOString()}.csv`;

    link.click();
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mt-1 me-2 fs-6">Appeitizers:</h5>
                <p className="mb-0">{currentDateTime}</p>
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
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
