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
export const data = {
  labels,
  datasets: [
    {
      label: 'Projected',
      data: [9, 9, 8, 7, 8, 11],
      borderColor: 'rgb(126, 142, 241)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Actual',
      data: [10, 10, 7, 8, 10, 11],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Daily() {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px' }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
