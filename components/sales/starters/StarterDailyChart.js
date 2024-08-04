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
      formatter: (value) => `${value}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value}k`;
        },
      },
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

export default function StarterDailyChart({ setActiveComponent, data }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM dd, yyyy');
    setCurrentDate(formattedDate);
  }, []);

  // Extract projected and actual daily revenue data from the provided data
  const dailyData = data.daily;
  const projectedData = Object.keys(dailyData)
    .filter((key) => key.includes('-projected'))
    .map((key) => dailyData[key]);
  const actualData = Object.keys(dailyData)
    .filter((key) => key.includes('-actual'))
    .map((key) => dailyData[key]);

  const chartData = {
    labels,
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
    ],
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mb-0 ">Starter:</h5>
              </span>
              <h6 className="text-center">{currentDate}</h6>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <Nav setActiveComponent={setActiveComponent} />
              </div>
            </div>
          </div>
        </div>
        <Bar className="" options={options} data={chartData} />
      </div>
    </div>
  );
}
