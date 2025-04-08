
import { format, subMonths } from 'date-fns';

// Behavioral spending types
export type SpendingType = 'Impulsive' | 'Emotional' | 'Social' | 'FOMO' | 'Status' | 'Planned';
export type FinancialBehavior = 'Avoider' | 'Spender' | 'Saver' | 'Planner' | 'Maximizer';

// Mock user profile
export const userProfile = {
  name: 'Rajat Sharma',
  age: 32,
  location: 'Pune',
  occupation: 'Software Engineer',
  income: 115000, // Monthly income in INR
  expenses: 78000,
  savings: 37000,
  behavior: 'Planner' as FinancialBehavior,
  riskTolerance: 'Moderate', // Low, Moderate, High
  financialGoals: [
    { 
      id: 1, 
      name: 'Emergency Fund', 
      target: 600000, 
      current: 300000,
      timeline: 12, // months
      priority: 'High',
    },
    { 
      id: 2, 
      name: 'Home Down Payment', 
      target: 2500000, 
      current: 750000,
      timeline: 36, // months
      priority: 'Medium',
    },
    { 
      id: 3, 
      name: 'Foreign Vacation', 
      target: 350000, 
      current: 50000,
      timeline: 24, // months
      priority: 'Low',
    },
  ],
  creditScore: 750,
  loans: [
    {
      type: 'Personal Loan',
      amount: 500000,
      remainingAmount: 325000,
      interestRate: 12.5,
      emi: 12500,
      tenure: 48, // months
      remainingTenure: 32, // months
    },
  ],
};

// Generate past 6 months of spending data
export const generateSpendingHistory = () => {
  const categories = [
    { name: 'Housing', percentage: 0.35, isEssential: true },
    { name: 'Food', percentage: 0.20, isEssential: true },
    { name: 'Transport', percentage: 0.10, isEssential: true },
    { name: 'Entertainment', percentage: 0.12, isEssential: false },
    { name: 'Shopping', percentage: 0.08, isEssential: false },
    { name: 'Dining Out', percentage: 0.07, isEssential: false },
    { name: 'Health', percentage: 0.05, isEssential: true },
    { name: 'Misc', percentage: 0.03, isEssential: false },
  ];
  
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    const monthYear = format(date, 'MMM yyyy');
    
    // Add some variability to expenses month to month
    const variabilityFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    const monthExpense = Math.round(userProfile.expenses * variabilityFactor);
    
    // Create spending breakdown by category
    const breakdown = categories.map(category => {
      // Add more variability to non-essential categories
      const catVariability = category.isEssential 
        ? 0.95 + Math.random() * 0.1 // 0.95 to 1.05 for essentials
        : 0.8 + Math.random() * 0.4; // 0.8 to 1.2 for non-essentials
        
      return {
        category: category.name,
        amount: Math.round(monthExpense * category.percentage * catVariability),
        isEssential: category.isEssential,
      };
    });
    
    // Some months have emotional spending
    const hasEmotionalSpending = Math.random() > 0.5;
    const emotionalSpending = hasEmotionalSpending ? {
      trigger: ['Social Pressure', 'Work Stress', 'Celebration', 'Sale/Discount'][Math.floor(Math.random() * 4)],
      amount: Math.round(5000 + Math.random() * 10000),
      category: ['Shopping', 'Dining Out', 'Entertainment'][Math.floor(Math.random() * 3)],
    } : null;
    
    // Calculate total spent this month
    const totalSpent = breakdown.reduce((sum, item) => sum + item.amount, 0) + 
                      (emotionalSpending ? emotionalSpending.amount : 0);
    
    return {
      month: monthYear,
      totalSpent,
      breakdown,
      emotionalSpending,
      saved: userProfile.income - totalSpent,
    };
  }).reverse(); // most recent month first
  
  return months;
};

export const spendingHistory = generateSpendingHistory();

// Investment recommendations
export interface InvestmentOption {
  type: string;
  name: string;
  allocation: number; // percentage
  risk: 'Low' | 'Moderate' | 'High';
  returns: {
    projected: number; // annual percentage
    historical: number; // annual percentage
  };
  description: string;
  suitability: FinancialBehavior[];
}

export const investmentRecommendations: InvestmentOption[] = [
  {
    type: 'Mutual Fund',
    name: 'Bluechip Equity Fund',
    allocation: 25,
    risk: 'Moderate',
    returns: {
      projected: 12,
      historical: 10.5,
    },
    description: 'A diversified equity fund investing in established companies with strong track records.',
    suitability: ['Planner', 'Maximizer'],
  },
  {
    type: 'Mutual Fund',
    name: 'Index Fund - Nifty 50',
    allocation: 15,
    risk: 'Moderate',
    returns: {
      projected: 10,
      historical: 9.8,
    },
    description: 'Passive fund that tracks the performance of the Nifty 50 index.',
    suitability: ['Avoider', 'Planner', 'Saver'],
  },
  {
    type: 'Fixed Income',
    name: 'Public Provident Fund (PPF)',
    allocation: 20,
    risk: 'Low',
    returns: {
      projected: 7.1,
      historical: 7.5,
    },
    description: 'Government-backed long-term savings scheme with tax benefits under Section 80C.',
    suitability: ['Avoider', 'Saver', 'Planner'],
  },
  {
    type: 'Fixed Income',
    name: 'Corporate Bond Fund',
    allocation: 15,
    risk: 'Low',
    returns: {
      projected: 7.5,
      historical: 8.2,
    },
    description: 'Invests in bonds issued by highly-rated companies, offering better returns than government securities.',
    suitability: ['Saver', 'Planner'],
  },
  {
    type: 'Equity',
    name: 'Mid-Cap Growth Fund',
    allocation: 10,
    risk: 'High',
    returns: {
      projected: 14,
      historical: 13.5,
    },
    description: 'Focuses on medium-sized companies with high growth potential.',
    suitability: ['Maximizer', 'Spender'],
  },
  {
    type: 'Fixed Income',
    name: 'Short-term Liquid Fund',
    allocation: 10,
    risk: 'Low',
    returns: {
      projected: 6,
      historical: 6.2,
    },
    description: 'Liquid fund for emergency access with reasonable returns.',
    suitability: ['Avoider', 'Spender', 'Saver'],
  },
  {
    type: 'Tax Saving',
    name: 'ELSS Fund',
    allocation: 5,
    risk: 'Moderate',
    returns: {
      projected: 11,
      historical: 10.8,
    },
    description: 'Equity-linked savings scheme offering tax benefits with a 3-year lock-in period.',
    suitability: ['Planner', 'Maximizer', 'Saver'],
  },
];

// Financial education modules
export const educationModules = [
  {
    id: 1,
    title: 'Investment Basics',
    description: 'Learn the fundamentals of investing and different asset classes',
    topics: [
      'Understanding risk and return',
      'Equity vs Debt investments',
      'Power of compounding',
      'Diversification strategies',
    ],
    difficulty: 'Beginner',
    duration: '25 mins',
    completed: false,
  },
  {
    id: 2,
    title: 'Mutual Funds 101',
    description: 'A complete guide to understanding mutual funds in India',
    topics: [
      'Types of mutual funds',
      'NAV and expense ratios',
      'SIP vs lump sum investments',
      'Direct vs regular plans',
    ],
    difficulty: 'Beginner',
    duration: '30 mins',
    completed: false,
  },
  {
    id: 3,
    title: 'Tax Planning',
    description: 'Optimize your investments for tax efficiency',
    topics: [
      'Section 80C deductions',
      'ELSS and PPF benefits',
      'Capital gains taxation',
      'NPS and other retirement schemes',
    ],
    difficulty: 'Intermediate',
    duration: '35 mins',
    completed: false,
  },
  {
    id: 4,
    title: 'Behavioral Finance',
    description: 'Understand how emotions affect financial decisions',
    topics: [
      'Cognitive biases in investing',
      'Emotional spending triggers',
      'Decision-making frameworks',
      'Creating healthy financial habits',
    ],
    difficulty: 'Intermediate',
    duration: '40 mins',
    completed: false,
  },
];
