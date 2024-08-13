// Hourly sales chart
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

const generateHourlySalesData = (hourlyAverageSales) => {
  const currentHour = new Date().getHours();
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    // If the hour hasn't passed yet, set sales to 0
    if (i + 11 > currentHour) {
      data.push(0);
    } else {
      // Generate random sales within a realistic range
      data.push(
        parseFloat(
          faker.datatype
            .float({
              min: hourlyAverageSales - 0.2,
              max: hourlyAverageSales + 0.2,
            })
            .toFixed(1)
        )
      );
    }
  }
  return data;
};

const generateRandomAverageData = (hourlyAverageSales) => {
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    data.push(
      parseFloat(
        faker.datatype
          .float({
            min: hourlyAverageSales - 0.3,
            max: hourlyAverageSales + 0.3,
          })
          .toFixed(1)
      )
    );
  }
  return data;
};

const hourlyAverageSales = 1.4; // Average sales per hour in thousands

export default function EntreeHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: 'Actual',
        data: generateHourlySalesData(hourlyAverageSales),
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Projected',
        data: generateHourlySalesData(hourlyAverageSales * 0.9), // Example adjustment for projected
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: generateRandomAverageData(hourlyAverageSales),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate} ${formattedTime}`);

    // Update the chart data every hour
    const interval = setInterval(() => {
      setChartData({
        labels,
        datasets: [
          {
            label: 'Actual',
            data: generateHourlySalesData(hourlyAverageSales),
            borderColor: 'rgb(177, 188, 255)',
            backgroundColor: 'rgb(177, 188, 255)',
          },
          {
            label: 'Projected',
            data: generateHourlySalesData(hourlyAverageSales * 0.9),
            borderColor: 'rgba(53, 162, 235, 0.5)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Average',
            data: generateRandomAverageData(hourlyAverageSales),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderWidth: 2,
          },
        ],
      });
    }, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Entrees:</h5>
                <p className="mb-0">{currentDateTime}</p>
              </div>
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
