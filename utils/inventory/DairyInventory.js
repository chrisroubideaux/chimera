// Dairy inventory import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';
import dairy from '@/data/inventory/dairy';

const generateSalesData = (items, dailySales, weeklySales, monthlySales) => {
  const salesData = items.map((item) => {
    const newItem = { ...item };
    const currentDate = new Date();

    // Initialize WeeklySales and MonthlySales
    newItem.WeeklySales = {};
    newItem.MonthlySales = {};

    // Generate sales data for the last 6 months starting from the current date
    for (let month = 0; month < 6; month++) {
      const monthDate = subMonths(currentDate, month);

      const monthKey = format(monthDate, 'MM-yyyy');
      newItem.MonthlySales[monthKey] = faker.datatype.number({
        min: 0,
        max: monthlySales,
      });

      // Generate sales data for each week within the month
      for (let week = 0; week < 4; week++) {
        const weekDate = subWeeks(monthDate, week);

        const weekKey = `${format(weekDate, 'MM-yyyy')}-W${week + 1}`;
        newItem.WeeklySales[weekKey] = faker.datatype.number({
          min: 0,
          max: weeklySales,
        });
      }
    }

    // Generate daily sales data for the last 30 days starting from the current date
    for (let day = 0; day < 30; day++) {
      const dayDate = subDays(currentDate, day);

      const dayKey = format(dayDate, 'yyyy-MM-dd');
      newItem.WeeklySales[dayKey] = faker.datatype.number({
        min: 0,
        max: dailySales,
      });

      // Generate a fake timestamp for each sale within the past 6 months
      newItem.time = faker.date
        .between(subMonths(currentDate, 6), currentDate)
        .toISOString();
    }

    return newItem;
  });

  return salesData;
};

const updatedDairy = generateSalesData(dairy, 11000, 75000, 289000);
console.log(updatedDairy);

export default updatedDairy;
