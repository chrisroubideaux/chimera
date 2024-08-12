// Houlry chart
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

// Utility function to generate dessert sales data
const generateDessertSalesData = (dailyTotal) => {
  const dessertPercentage = 0.12; // Desserts account for 12% of daily revenue
  const dessertTotal = dailyTotal * dessertPercentage;
  const hours = 11; // Number of hours to generate data for

  // Generate hourly sales data with some variance
  return Array.from({ length: hours }, (_, index) => {
    const baseSales = dessertTotal / hours;
    const variance = faker.datatype.float({
      min: -baseSales * 0.2,
      max: baseSales * 0.2,
    });
    const sales = baseSales + variance;

    // Ensure the sales data is in the expected range (up to 1.2k)
    return Math.min(Math.max(parseFloat(sales.toFixed(0)), 0), 1200);
  });
};

// Set the total daily revenue for the calculation
const dailyRevenueTotal = 11400; // Example daily revenue total

export default function DessertsHourlyChart({ setActiveComponent }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [hourlySalesData, setHourlySalesData] = useState({
    actual: [],
    projected: [],
    average: [],
  });
  const [isSunday, setIsSunday] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const formattedDate = format(now, 'MM/dd/yyyy');
    const formattedTime = format(now, 'h:mm a');
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);

    // Check if today is Sunday
    if (dayOfWeek === 0) {
      setIsSunday(true);
      setHourlySalesData({
        actual: [],
        projected: [],
        average: [],
      });
      return;
    }

    // Generate sales data
    const actualData = generateDessertSalesData(dailyRevenueTotal);
    const projectedData = actualData.map((sale) =>
      parseFloat((sale * 1.1).toFixed(0))
    ); // Projected data as 10% higher
    const averageData = Array.from({ length: 11 }, () =>
      parseFloat(
        (
          actualData.reduce((acc, val) => acc + val, 0) / actualData.length
        ).toFixed(0)
      )
    ); // Average data

    setHourlySalesData({
      actual: actualData,
      projected: projectedData,
      average: averageData,
    });
    setIsSunday(false);
  }, []);

  const { actual, projected, average } = hourlySalesData;

  const options = {
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
        text: 'Desserts Sales by Hour',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Format tooltip to show up to three significant digits
            return `$${parseFloat(context.raw).toFixed(0)}k`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value) {
            // Format x-axis ticks to show up to three significant digits
            return `${parseFloat(value).toFixed(0)}k`;
          },
        },
      },
    },
  };

  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Actual',
        data: isSunday ? [] : actual,
        borderColor: 'rgb(177, 188, 255)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Projected',
        data: isSunday ? [] : projected,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: isSunday ? [] : average,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        borderDash: [5, 5], // Dashed line for average
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
                <h5 className="mb-0 me-2">Desserts:</h5>
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
