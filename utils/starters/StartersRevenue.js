import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';

export default function StartersRevenue(
  dailyRevenueMin,
  dailyRevenueMax,
  weeklyRevenueMin,
  weeklyRevenueMax,
  monthlyRevenueMin,
  monthlyRevenueMax
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
      min: monthlyRevenueMin,
      max: monthlyRevenueMax,
    });
    revenueData.monthly[monthKey] = monthlyRevenueAmount;

    let totalWeeklyRevenue = 0;

    for (let week = 0; week < 4; week++) {
      const weekDate = subWeeks(monthDate, week);
      const weekKey = `${format(weekDate, 'MM-yyyy')}-W${week + 1}`;

      const weeklyRevenueAmount = faker.datatype.number({
        min: weeklyRevenueMin,
        max: weeklyRevenueMax,
      });
      revenueData.weekly[weekKey] = weeklyRevenueAmount;
      totalWeeklyRevenue += weeklyRevenueAmount;

      for (let day = 0; day < 7; day++) {
        const dayDate = subDays(weekDate, day);
        const dayKey = format(dayDate, 'yyyy-MM-dd');

        const projectedDailyRevenueAmount = faker.datatype.number({
          min: dailyRevenueMin * 0.8,
          max: dailyRevenueMin * 1.2,
        });
        const actualDailyRevenueAmount = faker.datatype.number({
          min: dailyRevenueMin * 0.7,
          max: dailyRevenueMin * 1.3,
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

{
  /*
import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';

export function generateRawStartersRevenueData(
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

export default generateRawStartersRevenueData;
*/
}
