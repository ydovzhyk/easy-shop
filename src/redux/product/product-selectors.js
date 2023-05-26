export const getBalance = ({ transactions }) => transactions.balance;
export const getMonthlySum = ({ transactions }) => transactions.monthlySum;
export const getTransactions = ({ transactions }) => transactions.transactions;
export const getCurrentDate = ({ transactions }) => transactions.currentDate;
export const getCalendarDate = ({ transactions }) => transactions.calendarDate;
export const getCategoryData = ({ transactions }) => transactions.chartData;
export const getReportBalance = ({ transactions }) => transactions.reportBalance;
export const getSliderReportData = ({ transactions }) => transactions.sliderReportData;
export const getCategoryName = ({ transactions }) => transactions.categoryName;

export const getError = ({ transactions }) => transactions.error;
export const getErrorCode = ({ transactions }) => transactions.errorCode;
export const isMessage = ({ transactions }) => transactions.message;
export const isLoading = ({ transactions }) => transactions.loading;
