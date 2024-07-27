// Hourly sales graph component
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

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

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: [1.5, 1.2, 1.3, 1, 1.1, 1.3, 1.3, 1.2, 1.2, 1.4, 1.2],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Projected',
      data: [1, 1.1, 1.1, 1, 1.4, 1.3, 1.6, 1.4, 1.3, 1.2, 1.1],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function HourlyDailyChart({ setActiveComponent }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'MMMM dd, yyyy');
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="d-flex align-items-center">
              <h5 className=" me-2">Hourly Sales / Starters:</h5>
              <p className="mb-0">{currentDate}</p>
            </div>
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0"></div>

            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>

                <div className="dropdown">
                  <div className="dropdown">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sales
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterHourlyChart')
                          }
                        >
                          Hourly
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterDailyChart')
                          }
                        >
                          Daily
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterWeeklyChart')
                          }
                        >
                          Weekly
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterMonthlyChart')
                          }
                        >
                          Monthly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

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

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: [1.5, 1.2, 1.3, 1, 1.1, 1.3, 1.3, 1.2, 1.2, 1.4, 1.2],
      borderColor: 'rgb(177, 188, 255)',
      backgroundColor: 'rgb(177, 188, 255)',
    },
    {
      label: 'Projected',
      data: [1, 1.1, 1.1, 1, 1.4, 1.3, 1.6, 1.4, 1.3, 1.2, 1.1],
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function HourlyDailyChart({ setActiveComponent }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = format(now, 'hh:mm:ss a');
      setCurrentTime(formattedTime);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5>Hourly Sales / Starters</h5>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm me-2">
                  <i className="fa-solid fa-download"></i> Export
                </button>

                <div className="dropdown">
                  <div className="dropdown">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sales
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterHourlyChart')
                          }
                        >
                          Hourly
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterDailyChart')
                          }
                        >
                          Daily
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterWeeklyChart')
                          }
                        >
                          Weekly
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            setActiveComponent('StarterMonthlyChart')
                          }
                        >
                          Monthly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Bar className="" options={options} data={data} />
            <div className="card-footer ">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
