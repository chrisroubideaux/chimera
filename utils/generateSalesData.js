// utils/generateSalesData.js
const generateSalesData = (products, startDate, endDate, hourlySales) => {
  const salesData = [];
  const hoursOfOperation = 10; // 11 AM to 9 PM
  const operationalDays = [1, 2, 3, 4, 5, 6]; // Monday to Saturday

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < totalDays; i++) {
    const currentDay = new Date(startDate.getTime() + i * 1000 * 60 * 60 * 24);
    const dayOfWeek = currentDay.getDay();

    if (operationalDays.includes(dayOfWeek)) {
      const numEntriesPerHour = Math.floor(hourlySales / hoursOfOperation);

      for (let hour = 0; hour < hoursOfOperation; hour++) {
        const currentHour = new Date(
          currentDay.getTime() + hour * 1000 * 60 * 60
        );
        const numEntries = Math.floor(numEntriesPerHour / products.length);

        for (let j = 0; j < numEntries; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const cost = parseFloat(product.price);
          const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
          const sale = {
            itemName: product.name,
            cost: cost,
            quantity: quantity,
            date: currentHour.toISOString(),
            category: product.category,
          };
          salesData.push(sale);
        }
      }
    }
  }

  return salesData;
};

export default generateSalesData;
