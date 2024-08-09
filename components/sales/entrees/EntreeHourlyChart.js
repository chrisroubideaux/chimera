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

const hourlyAverageSales = 1.2; // Average sales per hour in thousands

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
        data: Array(labels.length).fill(hourlyAverageSales),
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
            data: Array(labels.length).fill(hourlyAverageSales),
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

{
  /*
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
          return `$${context.raw.toFixed(1)}k`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          return `${value.toFixed(1)}k`;
        },
      },
      max: 4.0, // Set the max value for x-axis
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

const hourlySalesRange = {
  min: 0.5, // Minimum hourly sales
  max: 1.8, // Maximum hourly sales
};

const generateRandomHourlySales = () => {
  const projectedSales = [];
  const actualSales = [];
  const averageSales = [];

  const now = new Date();
  const currentHour = now.getHours();
  const isOpenHour = (hour) => {
    const hour24 = labels.indexOf(hour) + 11;
    return hour24 >= 11 && hour24 < currentHour;
  };

  labels.forEach((hour) => {
    const projected = parseFloat(
      faker.number
        .float({
          min: hourlySalesRange.min,
          max: hourlySalesRange.max,
          precision: 0.1,
        })
        .toFixed(1)
    );
    let actual;
    if (isOpenHour(hour)) {
      actual = parseFloat(
        faker.number
          .float({
            min: hourlySalesRange.min,
            max: hourlySalesRange.max,
            precision: 0.1,
          })
          .toFixed(1)
      );
    } else {
      actual = 0.0; // Sales for hours before the current time
    }
    const average = (projected + actual) / 2;

    projectedSales.push(projected);
    actualSales.push(actual);
    averageSales.push(average);
  });

  return { projectedSales, actualSales, averageSales };
};

export default function EntreeHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [chartData, setChartData] = useState({
    projectedSales: [],
    actualSales: [],
    averageSales: [],
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate} ${formattedTime}`);

    const updateSalesData = () => {
      const { projectedSales, actualSales, averageSales } =
        generateRandomHourlySales();
      setChartData({ projectedSales, actualSales, averageSales });
    };

    updateSalesData();

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
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Actual',
        data: chartData.actualSales,
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgb(177, 188, 255)',
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
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}


*/
}
