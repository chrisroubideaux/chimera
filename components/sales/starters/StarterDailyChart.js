// Daily chart component
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
import { format, addDays } from 'date-fns';
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
      formatter: (value) => {
        const number = (value / 1000).toFixed(1);
        return number.endsWith('.0') ? `${number.slice(0, -2)}k` : `${number}k`;
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          const number = (value / 1000).toFixed(1);
          return number.endsWith('.0')
            ? `${number.slice(0, -2)}k`
            : `${number}k`;
        },
        stepSize: 500,
      },
      min: 0,
      max: 4000,
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

const dailySalesRange = {
  min: 2000, // Increase range for more variability
  max: 4000,
};

const generateRandomSales = (min, max) => {
  return faker.datatype.float({ min, max }).toFixed(2);
};

// Function to generate daily sales data
const generateDailySalesData = () => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  labels.forEach((day) => {
    const projected = generateRandomSales(
      dailySalesRange.min,
      dailySalesRange.max
    );
    let actual;
    if (day === 'Friday' || day === 'Saturday') {
      actual = generateRandomSales(100, 500); // Increase variability for closed days
    } else {
      actual = generateRandomSales(dailySalesRange.min, dailySalesRange.max);
    }
    const average = (parseFloat(projected) + parseFloat(actual)) / 2;

    projectedSales.push(parseFloat(projected));
    actualSales.push(parseFloat(actual));
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function StarterDailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MM/dd/yyyy');
    setCurrentDate(formattedDate);

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateDailySalesData();
      setChartData({ projectedSales, actualSales, averageSales });
    };

    // Check if today is Sunday and reset sales for the new week
    if (format(now, 'EEEE') === 'Sunday') {
      updateSalesData();
    }

    // Set interval to update sales data at midnight
    const nowTime = now.getTime();
    const midnight = new Date().setHours(24, 0, 0, 0);
    const timeToMidnight = midnight - nowTime;

    const firstInterval = setTimeout(() => {
      updateSalesData();

      const interval = setInterval(() => {
        updateSalesData();
      }, 24 * 60 * 60 * 1000); // 24 hours

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

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 me-2">Starters:</h5>
                <p className="text-center">{currentDate}</p>
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
