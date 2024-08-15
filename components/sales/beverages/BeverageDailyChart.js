// Daily sales
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
      formatter: (value) => `${(value / 1000).toFixed(1)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${(value / 1000).toFixed(1)}k`;
        },
        stepSize: 500,
      },
      max: 10000,
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
  min: 3000,
  max: 6000,
};

const generateDailySalesData = (currentDay) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];
  let cumulativeActualSales = 0;

  labels.forEach((day, index) => {
    const projected = faker.datatype.float({
      min: dailySalesRange.min,
      max: dailySalesRange.max,
      precision: 0.01,
    });

    const actual =
      index <= currentDay
        ? (cumulativeActualSales += faker.datatype.float({
            min: dailySalesRange.min,
            max: dailySalesRange.max,
            precision: 0.01,
          }))
        : 0;

    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function BeverageDailyChart({ setActiveComponent }) {
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

    const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1;

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateDailySalesData(currentDay);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();

    const nowTime = now.getTime();
    const midnight = new Date().setHours(24, 0, 0, 0);
    const timeToMidnight = midnight - nowTime;

    const firstInterval = setTimeout(() => {
      updateSalesData();

      const interval = setInterval(() => {
        updateSalesData();
      }, 24 * 60 * 60 * 1000);

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
                <h5 className="">Drinks:</h5>
                <p className="">{currentDate}</p>
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

{
  /*
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
      formatter: (value) => `${(value / 1000).toFixed(1)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${(value / 1000).toFixed(1)}k`;
        },
        stepSize: 500,
      },
      max: 10000,
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
  min: 3000,
  max: 6000,
};

const generateDailySalesData = (currentDay) => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];
  let cumulativeActualSales = 0;

  labels.forEach((day, index) => {
    const projected = faker.datatype.float({
      min: dailySalesRange.min,
      max: dailySalesRange.max,
      precision: 0.01,
    });

    const actual =
      index <= currentDay
        ? (cumulativeActualSales += faker.datatype.float({
            min: dailySalesRange.min,
            max: dailySalesRange.max,
            precision: 0.01,
          }))
        : 0;

    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function BeverageDailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    setCurrentDate(formattedDate);

    const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1;

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateDailySalesData(currentDay);
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();

    const nowTime = now.getTime();
    const midnight = new Date().setHours(24, 0, 0, 0);
    const timeToMidnight = midnight - nowTime;

    const firstInterval = setTimeout(() => {
      updateSalesData();

      const interval = setInterval(() => {
        updateSalesData();
      }, 24 * 60 * 60 * 1000);

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
                <h5 className="">Drinks:</h5>
                <p className="">{currentDate}</p>
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

*/
}
