// Weekly Sales chart
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Nav from './Nav';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${value}`;
        },
      },
    },
  },
};

const lineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Current Week $8,760',
      data: [8640, 8700, 8800, 8650, 8750, 8600], // Example data points within range
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgba(177, 188, 255, 0.5)',
      fill: false,
    },
    {
      label: 'Previous Week $8,760',
      data: [8600, 8680, 8800, 8700, 8600, 8550], // Example data points within range
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: false,
    },
    {
      label: 'Average $8,760', // Label for the new yellow line
      data: [8760, 8760, 8760, 8760, 8760, 8760], // Constant average value
      borderColor: 'rgb(255, 205, 86)', // Yellow color for the line
      backgroundColor: 'rgba(255, 205, 86, 0.5)', // Light yellow background
      fill: false,
    },
  ],
};

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MMMM dd');
    const formattedEnd = format(end, 'MMMM dd, yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex ">
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

{
  /*
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Nav from './Nav';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `$${context.raw.toLocaleString()}k`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value / 1}k`;
        },
      },
    },
  },
};

const lineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Current Week $8,640',
      data: [77, 78, 77, 80, 81, 79, 83],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgba(177, 188, 255, 0.5)',
      fill: false,
    },
    {
      label: 'Previous Week $8,800',
      data: [72, 70, 65, 71, 77, 72, 70],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: false,
    },
    {
      label: 'Average $8,750', // Label for the new yellow line
      data: [73, 73, 73, 73, 73, 73, 73], // Example average data
      borderColor: 'rgb(255, 205, 86)', // Yellow color for the line
      backgroundColor: 'rgba(255, 205, 86, 0.5)', // Light yellow background
      fill: false,
    },
  ],
};

export default function StarterWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MMMM dd');
    const formattedEnd = format(end, 'MMMM dd, yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex ">
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
