import { faker } from '@faker-js/faker';
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

const generateSalesData = (categoryData) => {
  return categoryData.map((item) => {
    const hourlySales = {};
    const dailySales = {};
    const weeklySales = {};
    const monthlySales = {};

    // Define sales figures
    const dailySalesAverage = 11400; // Daily average sales figure
    const weeklySalesAverage = 74000; // Weekly average sales figure
    const monthlySalesAverage = 299293; // Monthly average sales figure

    // Generate sales data for each day in the last 30 days
    const last30Days = eachDayOfInterval({
      start: subDays(new Date(), 30),
      end: new Date(),
    });

    last30Days.forEach((date) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      dailySales[formattedDate] = faker.datatype.number({
        min: 0,
        max: dailySalesAverage,
      });
    });

    // Generate random sales for each hour in the last 24 hours
    for (let hour = 0; hour < 24; hour++) {
      const formattedTime = `${hour}:00`;
      hourlySales[formattedTime] = faker.datatype.number({
        min: 0,
        max: dailySalesAverage / 24,
      });
    }

    // Generate random sales for the current week
    const startOfWeek = subDays(startOfMonth(new Date()), new Date().getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    eachDayOfInterval({ start: startOfWeek, end: endOfWeek }).forEach(
      (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        weeklySales[formattedDate] = faker.datatype.number({
          min: 0,
          max: weeklySalesAverage,
        });
      }
    );

    // Generate random sales for the current month
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());

    eachDayOfInterval({
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    }).forEach((date) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      dailySales[formattedDate] = faker.datatype.number({
        min: 0,
        max: dailySalesAverage,
      });
    });

    // Generate random sales for the last 12 months
    for (let month = 0; month < 12; month++) {
      const formattedDate = format(subDays(new Date(), month * 30), 'yyyy-MM');
      monthlySales[formattedDate] = faker.datatype.number({
        min: 0,
        max: monthlySalesAverage,
      });
    }

    return {
      ...item,
      HourlySales: hourlySales,
      DailySales: dailySales,
      WeeklySales: weeklySales,
      MonthlySales: monthlySales,
    };
  });
};

export default generateSalesData;
