// Protein inventory

import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';

const ProteinsInventory = (items, dailySales, weeklySales, monthlySales) => {
  if (!Array.isArray(items)) {
    console.error('The items parameter should be an array.');
    return [];
  }

  const salesData = items.map((item) => {
    const newItem = { ...item };
    const currentDate = new Date();
    const pricePerUnit = item.price || 1;

    // Initialize WeeklySales and MonthlySales
    newItem.WeeklySales = {};
    newItem.MonthlySales = {};

    // Generate monthly sales data for the last six months
    for (let month = 0; month < 6; month++) {
      const monthDate = subMonths(currentDate, month);
      const monthKey = format(monthDate, 'MM-yyyy');
      const monthlySalesAmount = faker.datatype.number({
        min: 0,
        max: monthlySales,
      });
      newItem.MonthlySales[monthKey] = monthlySalesAmount;

      // Generate weekly sales data for each week within the month
      for (let week = 0; week < 4; week++) {
        const weekDate = subWeeks(monthDate, week);
        const weekKey = `${format(weekDate, 'MM-yyyy')}-W${week + 1}`;
        const weeklyCases = faker.datatype.number({ min: 1, max: 3 });
        const weeklySalesAmount = weeklyCases * item.price;
        newItem.WeeklySales[weekKey] = weeklySalesAmount;

        // Calculate units sold based on weekly sales amount and price per unit
        newItem.sold = weeklyCases;

        // Adjust par and projected based on sales
        newItem.par = weeklyCases * 2;
        newItem.projected = weeklyCases * 1.5;
      }
    }

    // Generate daily sales data for the last 30 days
    newItem.DailySales = {};
    for (let day = 0; day < 30; day++) {
      const dayDate = subDays(currentDate, day);
      const dayKey = format(dayDate, 'yyyy-MM-dd');
      newItem.DailySales[dayKey] = faker.datatype.number({
        min: 0,
        max: dailySales,
      });
    }

    // Update fields based on the item parameters
    newItem.date = format(currentDate, 'MM/dd/yy');
    newItem.time = faker.date
      .between(subMonths(currentDate, 6), currentDate)
      .toISOString();

    return newItem;
  });

  return salesData;
};

export default ProteinsInventory;

{
  /*
import { faker } from '@faker-js/faker';
import { subDays, subWeeks, subMonths, format } from 'date-fns';
import proteins from '@/data/inventory/proteins';

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

const updatedProteins = generateSalesData(proteins, 11000, 75000, 289000);
console.log(updatedProteins);

export default updatedProteins;
*/
}
