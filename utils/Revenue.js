import { faker } from '@faker-js/faker';
import { subDays, format } from 'date-fns';

function generateHourlySalesData(dailyAverage) {
  const hourlySales = [];
  for (let i = 0; i < 11; i++) {
    // 11am to 9pm
    const sales =
      dailyAverage / 11 + faker.datatype.number({ min: -100, max: 100 });
    hourlySales.push(parseFloat(sales.toFixed(2)));
  }
  return hourlySales;
}

function generateDailySalesData(dailyAverage) {
  const dailySales = [];
  for (let i = 0; i < 30; i++) {
    // Assume 30 days
    const dailySalesValue =
      dailyAverage + faker.datatype.number({ min: -2000, max: 2000 });
    dailySales.push(parseFloat(dailySalesValue.toFixed(2)));
  }
  return dailySales;
}

// Function to generate weekly sales data based on daily sales data
function generateWeeklySalesData(dailySalesData) {
  const weeklySales = [];
  for (let i = 0; i < 4; i++) {
    // Assume 4 weeks
    const weekSales = dailySalesData
      .slice(i * 7, (i + 1) * 7)
      .reduce((a, b) => a + b, 0);
    weeklySales.push(parseFloat(weekSales.toFixed(2)));
  }
  return weeklySales;
}

// Main function to generate sales data for hourly, daily, and weekly periods
export function Revenue(dailyAverage) {
  // Generate daily sales data
  const dailySalesData = generateDailySalesData(dailyAverage);

  // Generate weekly sales data from daily sales data
  const weeklySales = generateWeeklySalesData(dailySalesData);

  // Generate hourly sales data from daily average
  const hourlySales = generateHourlySalesData(dailyAverage);

  // Generate data for the last 7 days
  const lastSevenDays = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    lastSevenDays.push(format(date, 'yyyy-MM-dd'));
  }

  const dailyData = lastSevenDays.reduce((acc, date, index) => {
    acc[`${date}-projected`] = dailySalesData[index] || 0;
    acc[`${date}-actual`] = dailySalesData[index] || 0;
    return acc;
  }, {});

  return {
    daily: dailyData,
    weekly: weeklySales,
    hourly: hourlySales,
  };
}

export default Revenue;

{
  /*
import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';

export function Revenue(
  dailyRevenue,
  weeklyRevenue,
  monthlyRevenue
) {
  const revenueData = {
    hourly: {},
    daily: {},
    weekly: {},
    monthly: {},
  };

  const currentDate = new Date();

  for (let month = 0; month < 8; month++) {
    const monthDate = subMonths(currentDate, month);
    const monthKey = format(monthDate, 'MM-yyyy');
    const monthlyRevenueAmount = faker.datatype.number({
      min: monthlyRevenue * 0.9,
      max: monthlyRevenue * 1.1,
    });
    revenueData.monthly[monthKey] = monthlyRevenueAmount;

    let totalWeeklyRevenue = 0;

    for (let week = 0; week < 4; week++) {
      const weekDate = subWeeks(monthDate, week);
      const weekKey = `${format(weekDate, 'MM-yyyy')}-W${week + 1}`;

      const weeklyRevenueAmount = faker.datatype.number({
        min: weeklyRevenue * 0.9,
        max: weeklyRevenue * 1.1,
      });
      revenueData.weekly[weekKey] = weeklyRevenueAmount;
      totalWeeklyRevenue += weeklyRevenueAmount;

      for (let day = 0; day < 7; day++) {
        const dayDate = subDays(weekDate, day);
        const dayKey = format(dayDate, 'yyyy-MM-dd');

        const projectedDailyRevenueAmount = faker.datatype.number({
          min: dailyRevenue * 0.8,
          max: dailyRevenue * 1.2,
        });
        const actualDailyRevenueAmount = faker.datatype.number({
          min: dailyRevenue * 0.7,
          max: dailyRevenue * 1.3,
        });

        revenueData.daily[`${dayKey}-projected`] = projectedDailyRevenueAmount;
        revenueData.daily[`${dayKey}-actual`] = actualDailyRevenueAmount;

        for (let hour = 0; hour < 24; hour++) {
          const hourKey = `${dayKey}T${hour < 10 ? '0' : ''}${hour}:00:00`;

          const hourlyRevenueAmount = faker.datatype.number({
            min: (projectedDailyRevenueAmount / 24) * 0.9,
            max: (projectedDailyRevenueAmount / 24) * 1.1,
          });
          revenueData.hourly[hourKey] = hourlyRevenueAmount;
        }
      }
    }

    revenueData.monthly[monthKey] = parseFloat(
      (
        monthlyRevenueAmount +
        (monthlyRevenueAmount - totalWeeklyRevenue)
      ).toFixed(2)
    );
  }

  return revenueData;
}

export default Revenue;
*/
}
