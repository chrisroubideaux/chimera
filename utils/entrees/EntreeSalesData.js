// utils/entrees/functions/generateSalesData.js
import entrees from '@/data/entrees';
import generateSalesData from '@/utils/generateSalesData';

const DAILY_SALES = 12000;
const HOURLY_SALES = DAILY_SALES / 10;
const WEEKLY_SALES = DAILY_SALES * 7;
const MONTHLY_SALES = DAILY_SALES * 30;

const generateEntreesSalesData = (startDate, endDate) => {
  return generateSalesData(
    entrees,
    startDate,
    endDate,
    HOURLY_SALES,
    DAILY_SALES,
    WEEKLY_SALES,
    MONTHLY_SALES
  );
};

export default generateEntreesSalesData;
