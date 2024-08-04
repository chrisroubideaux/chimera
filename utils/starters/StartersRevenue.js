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

  // Generate data for the past 8 months
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

        const dailyRevenueAmount = faker.datatype.number({
          min: dailyRevenueMin,
          max: dailyRevenueMax,
        });

        // Distribute daily revenue across hours
        for (let hour = 0; hour < 24; hour++) {
          const hourKey = `${dayKey}T${hour < 10 ? '0' : ''}${hour}:00:00`;

          const hourlyRevenueAmount = faker.datatype.number({
            min: (dailyRevenueAmount / 24) * 0.8,
            max: (dailyRevenueAmount / 24) * 1.2,
          });

          revenueData.hourly[`${hourKey}-projected`] =
            Math.round(hourlyRevenueAmount);
          revenueData.hourly[`${hourKey}-actual`] =
            Math.round(hourlyRevenueAmount);
        }

        revenueData.daily[`${dayKey}-projected`] = dailyRevenueAmount;
        revenueData.daily[`${dayKey}-actual`] = dailyRevenueAmount;
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

  // Generate data for the past 8 months
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

        const dailyRevenueAmount = faker.datatype.number({
          min: dailyRevenueMin,
          max: dailyRevenueMax,
        });

        // Distribute daily revenue across hours
        for (let hour = 0; hour < 24; hour++) {
          const hourKey = `${dayKey}T${hour < 10 ? '0' : ''}${hour}:00:00`;

          const hourlyRevenueAmount = faker.datatype.number({
            min: (dailyRevenueAmount / 24) * 0.8,
            max: (dailyRevenueAmount / 24) * 1.2,
          });

          revenueData.hourly[`${hourKey}-projected`] =
            Math.round(hourlyRevenueAmount);
          revenueData.hourly[`${hourKey}-actual`] =
            Math.round(hourlyRevenueAmount);
        }

        revenueData.daily[`${dayKey}-projected`] = dailyRevenueAmount;
        revenueData.daily[`${dayKey}-actual`] = dailyRevenueAmount;
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

*/
}
