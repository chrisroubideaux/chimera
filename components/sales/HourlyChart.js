// Hourly Sales chart
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
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
      color: '#686D76',
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
      // Min & max values for the x-axis
      min: 0,
      max: 1800, //Max value to 1.8k
    },
  },
};

// Function to generate hourly sales data
const generateHourlySalesData = (averageHourlySales, openHour, closeHour) => {
  const hours = labels.length;
  const salesData = [];

  for (let i = 0; i < hours; i++) {
    if (i < openHour || i > closeHour) {
      salesData.push(0);
    } else {
      const variance = faker.datatype.float({ min: -300, max: 300 });
      const hourlySales = Math.max(0, averageHourlySales + variance);
      salesData.push(parseFloat(hourlySales.toFixed(2)));
    }
  }
  return salesData;
};

export default function HourlyChart({}) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const now = new Date();
    const today = now.getDate();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const formattedDate = format(tomorrow, 'MMMM dd, yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);

    const currentHour = now.getHours() - 11; // 0-10 scale for 11am to 9pm
    const openHour = 0; // 11am is the 0th index in labels
    const closeHour = 9; // 9pm is the 9th index in labels

    const hourlyAverageSales = 1400; // $1,400 avg per hr

    let actualData = Array(labels.length).fill(0);

    if (today !== now.getDate()) {
      actualData = generateHourlySalesData(
        hourlyAverageSales,
        openHour,
        closeHour
      );
    }

    const projectedData = Array(labels.length)
      .fill()
      .map((_, index) => {
        const projectedVariance = faker.datatype.float({ min: -200, max: 200 });
        return Math.max(
          0,
          (hourlyAverageSales + projectedVariance) * (index + 1)
        );
      });

    // Calculate the average value for the actual and projected data
    const averageProjected =
      projectedData.reduce((sum, value) => sum + value, 0) /
      projectedData.length;
    const averageActual =
      actualData.reduce((sum, value) => sum + value, 0) / actualData.length;

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
          data: Array(labels.length).fill(
            (averageProjected + averageActual) / 2
          ),
          borderColor: 'rgba(255, 165, 0, 0.7)',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderWidth: 2,
          type: 'bar',
        },
      ],
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Hourly:</h5>
                <p className="mb-0">{currentDateTime}</p>
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
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
