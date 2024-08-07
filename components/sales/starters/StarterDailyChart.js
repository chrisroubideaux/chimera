// Daily chart component
import { faker } from '@faker-js/faker';
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
import { format, subDays } from 'date-fns';
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
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}k`;
        }
        return value.toLocaleString();
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 3000,
      ticks: {
        stepSize: 500,
        callback: function (value) {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
          }
          return value.toLocaleString();
        },
      },
    },
    x: {
      categoryPercentage: 0.8,
      barPercentage: 0.9,
    },
  },
};

// Generate labels for the last 7 days
const getLastSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    days.push(format(date, 'EEEE'));
  }
  return days;
};

// Function to generate daily sales data with some variance
const generateDailySales = (dailyAverage, variation) => {
  const dailySales = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, i);
    const keyProjected = format(date, 'yyyy-MM-dd') + '-projected';
    const keyActual = format(date, 'yyyy-MM-dd') + '-actual';

    // Generate random variance using faker
    const projected = Math.round(
      dailyAverage +
        faker.datatype.float({ min: -variation / 2, max: variation / 2 })
    );
    const actual = Math.round(
      dailyAverage +
        faker.datatype.float({ min: -variation / 2, max: variation / 2 })
    );

    dailySales[keyProjected] = projected;
    dailySales[keyActual] = actual;
  }
  return dailySales;
};

export default function StarterDailyChart({ setActiveComponent }) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshChartData = () => {
      // Generate revenue data
      const revenueData = generateDailySales(2200, 500);

      // Get the last 7 days
      const lastSevenDays = getLastSevenDays();
      const today = new Date();

      // Extract daily revenue for the last 7 days
      const projectedData = lastSevenDays.map((day, index) => {
        const date = subDays(today, 6 - index);
        const key = format(date, 'yyyy-MM-dd') + '-projected';
        return revenueData[key] || 0;
      });

      const actualData = lastSevenDays.map((day, index) => {
        const date = subDays(today, 6 - index);
        const key = format(date, 'yyyy-MM-dd') + '-actual';
        return revenueData[key] || 0;
      });

      // Assuming the daily average revenue is 2200
      const averageData = new Array(7).fill(2200);

      setChartData({
        labels: lastSevenDays,
        datasets: [
          {
            label: 'Projected Sales',
            data: projectedData,
            borderColor: 'rgb(126, 142, 241)',
            backgroundColor: 'rgb(177, 188, 255)',
          },
          {
            label: 'Actual Sales',
            data: actualData,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Average Sales',
            data: averageData,
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
            type: 'line',
            tension: 0.1,
          },
        ],
      });
      setLoading(false);
    };

    refreshChartData();

    const intervalId = setInterval(() => {
      refreshChartData();
    }, 3600000); // Refresh every hour

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = format(new Date(), 'MM/dd/yyyy');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0">Starters:</h5>
                <h6 className="text-center mt-1">{currentDate}</h6>
              </span>
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

{
  /*
import { faker } from '@faker-js/faker';
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
import { format, subDays } from 'date-fns';
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
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}k`;
        }
        return value.toLocaleString();
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 3000,
      ticks: {
        stepSize: 500,
        callback: function (value) {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
          }
          return value.toLocaleString();
        },
      },
    },
    x: {
      categoryPercentage: 0.8,
      barPercentage: 0.9,
    },
  },
};

// Generate labels for the last 7 days
const getLastSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    days.push(format(date, 'EEEE'));
  }
  return days;
};

// Function to generate daily sales data with some variance
const generateDailySales = (dailyAverage, variation) => {
  const dailySales = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, i);
    const keyProjected = format(date, 'yyyy-MM-dd') + '-projected';
    const keyActual = format(date, 'yyyy-MM-dd') + '-actual';

    // Generate random variance using faker
    const projected = Math.round(
      dailyAverage +
        faker.datatype.float({ min: -variation / 2, max: variation / 2 })
    );
    const actual = Math.round(
      dailyAverage +
        faker.datatype.float({ min: -variation / 2, max: variation / 2 })
    );

    dailySales[keyProjected] = projected;
    dailySales[keyActual] = actual;
  }
  return dailySales;
};

export default function StarterDailyChart({ setActiveComponent }) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshChartData = () => {
      // Generate revenue data
      const revenueData = generateDailySales(2200, 500);

      // Get the last 7 days
      const lastSevenDays = getLastSevenDays();
      const today = new Date();

      // Extract daily revenue for the last 7 days
      const projectedData = lastSevenDays.map((day, index) => {
        const date = subDays(today, 6 - index);
        const key = format(date, 'yyyy-MM-dd') + '-projected';
        return revenueData[key] || 0;
      });

      const actualData = lastSevenDays.map((day, index) => {
        const date = subDays(today, 6 - index);
        const key = format(date, 'yyyy-MM-dd') + '-actual';
        return revenueData[key] || 0;
      });

      // Assuming the daily average revenue is 2200
      const averageData = new Array(7).fill(2200);

      setChartData({
        labels: lastSevenDays,
        datasets: [
          {
            label: 'Projected Sales',
            data: projectedData,
            borderColor: 'rgb(126, 142, 241)',
            backgroundColor: 'rgb(177, 188, 255)',
          },
          {
            label: 'Actual Sales',
            data: actualData,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Average Sales',
            data: averageData,
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
            type: 'line',
            tension: 0.1,
          },
        ],
      });
      setLoading(false);
    };

    refreshChartData();

    const intervalId = setInterval(() => {
      refreshChartData();
    }, 3600000); // Refresh every hour

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = format(new Date(), 'MM/dd/yyyy');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0">Starters:</h5>
                <h6 className="text-center mt-1">{currentDate}</h6>
              </span>
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


*/
}
