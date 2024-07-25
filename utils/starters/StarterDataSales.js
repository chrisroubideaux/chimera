// utils/starters/functions/generateSalesData.js
import starters from '@/data/starters';
import generateSalesData from '@/utils/generateSalesData';

const DAILY_SALES = 12000;
const HOURLY_SALES = DAILY_SALES / 10;
const WEEKLY_SALES = DAILY_SALES * 7;
const MONTHLY_SALES = DAILY_SALES * 30;

const StarterSalesData = (startDate, endDate) => {
  return generateSalesData(
    starters,
    startDate,
    endDate,
    HOURLY_SALES,
    DAILY_SALES,
    WEEKLY_SALES,
    MONTHLY_SALES
  );
};

export default StarterSalesData;
