// Daily Sales chart
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
import { format, subDays } from 'date-fns'; // Ensure subDays is imported
import Revenue from '@/utils/Revenue'; // Import the Revenue function

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Define the chart options
const options = {
  plugins: {
    datalabels: {
      color: 'black',
      display: true,
      anchor: 'end',
      align: 'top',
      formatter: (value) => value.toLocaleString(),
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Day of the Week',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Revenue',
      },
      ticks: {
        callback: (value) => value.toLocaleString(),
      },
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

export default function DailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    labels: getLastSevenDays(),
    datasets: [
      {
        label: 'Projected',
        data: [],
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Daily Average',
        data: [],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line', // Adding this dataset as a line type
        tension: 0.1, // Optional: Smooth the line
      },
    ],
  });

  const refreshChartData = () => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM dd, yyyy');
    setCurrentDate(formattedDate);

    // Generate revenue data
    const revenueData = Revenue(11000, 74000, 299293);

    // Get the last 7 days
    const lastSevenDays = getLastSevenDays();
    const today = new Date();

    // Extract daily revenue for the last 7 days
    const projectedData = lastSevenDays.map((day, index) => {
      const date = subDays(today, 6 - index);
      const key = format(date, 'yyyy-MM-dd') + '-projected';
      return revenueData.daily[key] || 0;
    });

    const actualData = lastSevenDays.map((day, index) => {
      const date = subDays(today, 6 - index);
      const key = format(date, 'yyyy-MM-dd') + '-actual';
      return revenueData.daily[key] || 0;
    });

    // Assuming the restaurant is open Mon-Sat (6 days a week)
    const dailyAverage = 11000; // Daily average revenue

    const averageData = new Array(7).fill(dailyAverage);

    setChartData({
      labels: lastSevenDays,
      datasets: [
        {
          label: 'Projected',
          data: projectedData,
          borderColor: 'rgb(126, 142, 241)',
          backgroundColor: 'rgb(177, 188, 255)',
        },
        {
          label: 'Actual',
          data: actualData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Daily Average',
          data: averageData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          type: 'line',
          tension: 0.1,
        },
      ],
    });
  };

  useEffect(() => {
    refreshChartData();

    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      if (now > midnight) {
        refreshChartData();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

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
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>
              </div>
            </div>
          </div>
          <Bar className="" options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}
