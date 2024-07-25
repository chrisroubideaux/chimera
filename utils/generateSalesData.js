// utils/generateSalesData.js
import { subMonths, formatISO, startOfDay } from 'date-fns';

const generateSalesData = (
  products,
  startDate,
  endDate,
  hourlySales,
  dailySales,
  weeklySales,
  monthlySales
) => {
  const salesData = [];
  const hoursOfOperation = 10; // 11 AM to 9 PM
  const operationalDays = [1, 2, 3, 4, 5, 6]; // Monday to Saturday

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < totalDays; i++) {
    const currentDay = new Date(startDate.getTime() + i * 1000 * 60 * 60 * 24);
    const dayOfWeek = currentDay.getDay();

    if (operationalDays.includes(dayOfWeek)) {
      const numEntriesPerHour = Math.floor(hourlySales / hoursOfOperation);
      const numEntriesPerDay = Math.floor(dailySales / products.length);
      const numEntriesPerWeek = Math.floor(weeklySales / (products.length * 7));
      const numEntriesPerMonth = Math.floor(
        monthlySales / (products.length * 30)
      );

      // Generate hourly data
      for (let hour = 0; hour < hoursOfOperation; hour++) {
        const currentHour = new Date(
          currentDay.getTime() + hour * 1000 * 60 * 60
        );
        for (let j = 0; j < numEntriesPerHour; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const cost = parseFloat(product.price);
          const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
          const sale = {
            itemName: product.name,
            cost: cost,
            quantity: quantity,
            date: formatISO(currentHour),
            category: product.category,
            interval: 'Hourly',
          };
          salesData.push(sale);
        }
      }

      // Generate daily data
      for (let j = 0; j < numEntriesPerDay; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const cost = parseFloat(product.price);
        const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
        const sale = {
          itemName: product.name,
          cost: cost,
          quantity: quantity,
          date: formatISO(currentDay),
          category: product.category,
          interval: 'Daily',
        };
        salesData.push(sale);
      }

      // Generate weekly data (based on the same day each week)
      const startOfWeek = new Date(currentDay);
      startOfWeek.setDate(currentDay.getDate() - currentDay.getDay() + 1); // Adjust to Monday
      if (currentDay >= startOfWeek) {
        for (let j = 0; j < numEntriesPerWeek; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const cost = parseFloat(product.price);
          const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
          const sale = {
            itemName: product.name,
            cost: cost,
            quantity: quantity,
            date: formatISO(startOfWeek),
            category: product.category,
            interval: 'Weekly',
          };
          salesData.push(sale);
        }
      }

      // Generate monthly data
      if (i % 30 === 0) {
        // Approximate monthly interval
        for (let j = 0; j < numEntriesPerMonth; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const cost = parseFloat(product.price);
          const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
          const sale = {
            itemName: product.name,
            cost: cost,
            quantity: quantity,
            date: formatISO(currentDay),
            category: product.category,
            interval: 'Monthly',
          };
          salesData.push(sale);
        }
      }
    }
  }

  return salesData;
};

export default generateSalesData;
