
/**
 * Calculates future value of a lump sum investment
 * @param principal Initial investment amount
 * @param rate Annual interest rate (as a decimal, e.g., 0.08 for 8%)
 * @param time Time period in years
 * @returns Future value
 */
export const calculateLumpSumFutureValue = (
  principal: number,
  rate: number,
  time: number
): number => {
  return principal * Math.pow(1 + rate, time);
};

/**
 * Calculates future value of a SIP (Systematic Investment Plan)
 * @param monthlyInvestment Monthly investment amount
 * @param rate Annual interest rate (as a decimal, e.g., 0.08 for 8%)
 * @param time Time period in years
 * @returns Future value
 */
export const calculateSIPFutureValue = (
  monthlyInvestment: number,
  rate: number, 
  time: number
): number => {
  const monthlyRate = rate / 12;
  const months = time * 12;
  return monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
};

/**
 * Calculates the monthly SIP amount required to reach a target amount
 * @param targetAmount Target future value
 * @param rate Annual interest rate (as a decimal, e.g., 0.08 for 8%)
 * @param time Time period in years
 * @returns Required monthly investment
 */
export const calculateRequiredSIP = (
  targetAmount: number,
  rate: number,
  time: number
): number => {
  const monthlyRate = rate / 12;
  const months = time * 12;
  return targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
};

/**
 * Calculates time required to reach a target amount with regular SIP
 * @param targetAmount Target future value
 * @param monthlyInvestment Monthly investment amount
 * @param rate Annual interest rate (as a decimal, e.g., 0.08 for 8%)
 * @returns Time required in years (approximate)
 */
export const calculateTimeToReachTarget = (
  targetAmount: number,
  monthlyInvestment: number,
  rate: number
): number => {
  const monthlyRate = rate / 12;
  // Approximate calculation using logarithms
  return Math.log(1 + (targetAmount * monthlyRate) / monthlyInvestment) / (12 * Math.log(1 + monthlyRate));
};

/**
 * Formats a number as Indian currency (INR)
 * @param amount Amount to format
 * @returns Formatted string with ₹ symbol
 */
export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

/**
 * Formats a number as a percentage
 * @param value Value to format (as decimal, e.g., 0.08 for 8%)
 * @returns Formatted percentage string
 */
export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

/**
 * Calculate optimal investment allocation based on risk profile and goals
 * @param monthlyInvestment Total monthly investment amount
 * @param riskProfile Risk profile (Low, Moderate, High)
 * @param goalTimeframe Average goal timeframe in years
 * @returns Allocation object with percentages
 */
export const calculateOptimalAllocation = (
  monthlyInvestment: number,
  riskProfile: string,
  goalTimeframe: number
): { equity: number; debt: number; liquid: number } => {
  // Basic allocation based on risk profile
  let equity = 0;
  let debt = 0;
  let liquid = 0;
  
  if (riskProfile === 'Low') {
    equity = 0.30;
    debt = 0.50;
    liquid = 0.20;
  } else if (riskProfile === 'Moderate') {
    equity = 0.50;
    debt = 0.35;
    liquid = 0.15;
  } else { // High
    equity = 0.70;
    debt = 0.20;
    liquid = 0.10;
  }
  
  // Adjust based on goal timeframe
  if (goalTimeframe < 3) {
    // Short-term: reduce equity, increase liquid
    equity *= 0.7;
    liquid += (equity * 0.3);
  } else if (goalTimeframe > 7) {
    // Long-term: increase equity, reduce debt
    equity = Math.min(equity * 1.2, 0.80);
    debt = 1 - equity - liquid;
  }
  
  return {
    equity,
    debt,
    liquid,
  };
};
