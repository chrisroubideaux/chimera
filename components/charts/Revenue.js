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

// Register necessary components for the line chart
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
      text: 'Weekly Chart',
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
          return `${value / 1}k`; // Converts value to 'k' format
        },
      },
    },
  },
};

const lineChartData = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      label: 'Current Week',
      data: [65, 70, 75, 80, 81, 72, 75],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Previous Week',
      data: [72, 70, 65, 71, 77, 72, 70],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Revenue() {
  return (
    <div className="container py-3">
      <h1 className="fs-4 text-normal">Sales</h1>
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-6">
            <h1 className="fs-4 mb-0 mt-3">Current Week</h1>
            <h2 className="fw-normal mb-3">
              <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
              <span>$75k</span>
            </h2>
          </div>
          <div className="col-sm-6">
            <h1 className="fs-4 mb-0 mt-3">Previous Week</h1>
            <h2 className="fw-normal mb-3">
              <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
              <span>$58k</span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="box" style={{ maxWidth: '800px' }}>
              <Line options={lineChartOptions} data={lineChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* import { Line } from 'react-chartjs-2';
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

// Register necessary components for the line chart
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
      text: 'Weekly Chart ',
    },
  },
};

const lineChartData = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      label: 'Current Week',
      data: [8000, 9500, 11000, 10500, 12000, 13000, 12500],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Previous Week',
      data: [7000, 8500, 9000, 9500, 10000, 11500, 11000],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Revenue() {
  return (
    <div className="container py-3">
      <h1 className="fs-4 text-normal">Sales</h1>
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-6">
            <h1 className="fs-4 mb-0 mt-3">Current Week</h1>
            <h2 className="fw-normal mb-3">
              <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
              <span>$58,254</span>
            </h2>
          </div>
          <div className="col-sm-6">
            <h1 className="fs-4 mb-0 mt-3">Previous Week</h1>
            <h2 className="fw-normal mb-3">
              <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
              <span>$69,524</span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="box" style={{ maxWidth: '800px' }}>
              <Line options={lineChartOptions} data={lineChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 */
}
