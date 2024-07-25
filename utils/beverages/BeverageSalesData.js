// utils/beverages/functions/generateSalesData.js
import beverages from '@/data/beverages';
import generateSalesData from '@/utils/generateSalesData';

const DAILY_SALES = 12000;
const HOURLY_SALES = DAILY_SALES / 10;
const WEEKLY_SALES = DAILY_SALES * 7;
const MONTHLY_SALES = DAILY_SALES * 30;

const generateBeveragesSalesData = (startDate, endDate) => {
  return generateSalesData(
    beverages,
    startDate,
    endDate,
    HOURLY_SALES,
    DAILY_SALES,
    WEEKLY_SALES,
    MONTHLY_SALES
  );
};

export default generateBeveragesSalesData;
