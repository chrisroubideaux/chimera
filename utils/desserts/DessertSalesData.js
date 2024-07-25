// utils/desserts/functions/generateSalesData.js
import desserts from '@/data/desserts';
import generateSalesData from '@/utils/generateSalesData';

const DAILY_SALES = 12000;
const HOURLY_SALES = DAILY_SALES / 10;
const WEEKLY_SALES = DAILY_SALES * 7;
const MONTHLY_SALES = DAILY_SALES * 30;

const DessertSalesData = (startDate, endDate) => {
  return generateSalesData(
    desserts,
    startDate,
    endDate,
    HOURLY_SALES,
    DAILY_SALES,
    WEEKLY_SALES,
    MONTHLY_SALES
  );
};

export default DessertSalesData;
