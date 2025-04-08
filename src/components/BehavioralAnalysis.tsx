
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/investmentCalculations';
import { spendingHistory } from '@/utils/financialData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BehavioralAnalysis = () => {
  // Transform data for the charts
  const spendingData = spendingHistory.map((month) => ({
    name: month.month,
    amount: month.totalSpent,
  }));

  // Get latest month's spending breakdown for pie chart
  const latestMonth = spendingHistory[0];
  const pieChartData = latestMonth.breakdown.map((item) => ({
    name: item.category,
    value: item.amount,
    isEssential: item.isEssential,
  }));

  // Colors for pie chart
  const COLORS = ['#0052CC', '#00B8D9', '#36B37E', '#FF5630', '#6554C0', '#FFAB00', '#8777D9', '#6B778C'];

  // Calculate emotional spending stats
  const emotionalSpendingMonths = spendingHistory.filter(
    (month) => month.emotionalSpending !== null
  );
  const emotionalSpendingPercentage = Math.round(
    (emotionalSpendingMonths.length / spendingHistory.length) * 100
  );
  const totalEmotionalSpending = emotionalSpendingMonths.reduce(
    (sum, month) => sum + (month.emotionalSpending?.amount || 0),
    0
  );
  const avgEmotionalSpending = totalEmotionalSpending / emotionalSpendingMonths.length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Spending Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar
                  dataKey="amount"
                  fill="#0052CC"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 bg-muted/40 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">Spending Insights:</h4>
            <ul className="space-y-1">
              <li>• Your highest spending month was {spendingData.reduce((max, item) => max.amount > item.amount ? max : item, spendingData[0]).name}</li>
              <li>• You've saved {formatCurrency(spendingHistory.reduce((sum, month) => sum + month.saved, 0))} in the last 6 months</li>
              <li>• {emotionalSpendingPercentage}% of months show emotional spending patterns</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {emotionalSpendingMonths.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Emotional Spending Patterns:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-fintech-blue/10 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="text-xl font-bold text-fintech-blue">{emotionalSpendingPercentage}%</p>
                  <p className="text-xs text-muted-foreground">of months</p>
                </div>
                <div className="bg-fintech-blue/10 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average Amount</p>
                  <p className="text-xl font-bold text-fintech-blue">{formatCurrency(avgEmotionalSpending)}</p>
                  <p className="text-xs text-muted-foreground">per occurrence</p>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-medium">Common Triggers:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.from(new Set(emotionalSpendingMonths.map(m => m.emotionalSpending?.trigger))).map((trigger, i) => (
                    <span key={i} className="bg-fintech-gold/20 text-fintech-gold-dark px-2 py-1 rounded-full text-xs">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralAnalysis;
