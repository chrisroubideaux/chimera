// Weekly sales chart
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { startOfWeek, endOfWeek, format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Utility function to format numbers as "1.5k"
const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
};

// Function to generate weekly sales data with adjustments
const generateWeeklySalesData = (weeklyTotal, days = 7) => {
  const dailyAverage = weeklyTotal / days;
  return Array.from({ length: days }, () => {
    const variance = faker.datatype.float({
      min: -dailyAverage * 0.2,
      max: dailyAverage * 0.2,
    }); // Random avg +/- 20% of daily average
    return dailyAverage + variance;
  });
};

// Set specific weekly sales values
const currentWeekSalesTotal = 8500; // 8.5k
const previousWeekSalesTotal = 8900; // 8.9k
const weeklyAverageSales = 8800; // 8.8k

export default function DessertsWeeklyChart({ setActiveComponent }) {
  const [currentWeek, setCurrentWeek] = useState('');
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const formattedStart = format(start, 'MM/dd/yyyy');
    const formattedEnd = format(end, 'MM/dd/yyyy');
    setCurrentWeek(`${formattedStart} - ${formattedEnd}`);
  }, []);

  // Generate weekly sales data
  const allDaysSales = generateWeeklySalesData(currentWeekSalesTotal);
  const previousWeekSales = generateWeeklySalesData(previousWeekSalesTotal);
  const averageData = generateWeeklySalesData(weeklyAverageSales);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sales Data',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${formatNumber(context.raw)}`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value) {
          return formatNumber(value);
        },
        color: 'black',
        font: {
          weight: 'normal',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${formatNumber(value)}`;
          },
        },
        max: 1600, // y-axis maximum to 1.6k
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
    ],
    datasets: [
      {
        label: `Current Week $${formatNumber(currentWeekSalesTotal)}`,
        data: allDaysSales,
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgba(177, 188, 255, 0.5)',
        fill: false,
      },
      {
        label: `Previous Week $${formatNumber(previousWeekSalesTotal)}`,
        data: previousWeekSales,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: `Average $${formatNumber(weeklyAverageSales)}`,
        data: averageData,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        fill: false,
      },
    ],
  };
  //
  // Function to generate CSV from sales data
  const generateCSV = () => {
    const headers = [
      'Day',
      'Current Week Sales',
      'Previous Week Sales',
      'Average Sales',
    ];
    const rows = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ].map((day, index) => [
      day,
      `${(allDaysSales[index] / 1000).toFixed(1)}k`,
      `${(previousWeekSales[index] / 1000).toFixed(1)}k`,
      `${(averageData[index] / 1000).toFixed(1)}k`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `weekly_sales_${new Date().toISOString()}.csv`;

    link.click();
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <div className="d-flex">
                <h5 className="">Desserts:</h5>
                <p className="">{currentWeek}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="d-flex justify-content-end">
                <button onClick={generateCSV} className="btn btn-sm me-2">
                  Export CSV
                </button>
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
