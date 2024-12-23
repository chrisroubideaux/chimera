// Monthly Sales chart
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
import { format, eachMonthOfInterval, getDaysInMonth, getDate } from 'date-fns';
import Nav from './Nav';
import { faker } from '@faker-js/faker';

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
      formatter: (value) => `${(value / 1000).toFixed(0)}k`,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `$${(value / 1000).toFixed(0)}k`;
        },
      },
      min: 0,
      max: 45000,
    },
  },
};

// Function to generate random monthly sales data
const generateMonthlySalesData = (averageSales, months) => {
  return months.map((_, index) => {
    const isCurrentMonth = index === months.length - 1;
    const daysInMonth = getDaysInMonth(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - months.length + index + 1
      )
    );
    const daysElapsed = isCurrentMonth ? getDate(new Date()) : daysInMonth;
    const averageDailySales = averageSales / daysInMonth;
    const dailySales = averageDailySales * daysElapsed;
    const variance = faker.datatype.float({ min: -5000, max: 5000 });
    return Math.max(0, dailySales + variance);
  });
};

export default function StarterMonthlyChart({ setActiveComponent }) {
  const [chartData, setChartData] = useState({
    labels: [],
    projectedSalesData: [],
    actualSalesData: [],
    averageSales: [],
  });

  useEffect(() => {
    const currentDate = new Date();
    const months = eachMonthOfInterval({
      start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 7, 1),
      end: currentDate,
    }).map((date) => format(date, 'MMMM'));

    const averageMonthlySales = 35400;

    const projectedSalesData = generateMonthlySalesData(
      averageMonthlySales,
      months
    );
    const actualSalesData = generateMonthlySalesData(
      averageMonthlySales,
      months
    );

    setChartData({
      labels: months,
      projectedSalesData,
      actualSalesData,
      averageSales: new Array(months.length).fill(averageMonthlySales),
    });
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Projected Sales',
        data: chartData.projectedSalesData,
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual Sales',
        data: chartData.actualSalesData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average Sales',
        data: chartData.averageSales,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
    ],
  };

  const currentDate = format(new Date(), 'MM/dd/yyyy');

  // Function to generate CSV from monthly sales data
  const generateCSV = () => {
    const headers = [
      'Month',
      'Projected Sales',
      'Actual Sales',
      'Average Sales',
    ];
    const rows = chartData.labels.map((month, index) => [
      month,
      `${(chartData.projectedSalesData[index] / 1000).toFixed(0)}k`,
      `${(chartData.actualSalesData[index] / 1000).toFixed(0)}k`,
      `${(chartData.averageSales[index] / 1000).toFixed(0)}k`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `monthly_sales_${new Date().toISOString()}.csv`;

    link.click();
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <span className="d-flex">
                <h5 className="mt-1 me-2 fs-6">Appeitizers:</h5>
                <h6 className="text-center mt-1">{currentDate}</h6>
              </span>
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
          <Bar className="" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
