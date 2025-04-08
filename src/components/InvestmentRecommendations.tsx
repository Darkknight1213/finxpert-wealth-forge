
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { investmentRecommendations, userProfile } from '@/utils/financialData';
import { formatCurrency } from '@/utils/investmentCalculations';

const InvestmentRecommendations = () => {
  // Group recommendations by type
  const groupedByType = investmentRecommendations.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {
        name: item.type,
        value: item.allocation,
      };
    } else {
      acc[item.type].value += item.allocation;
    }
    return acc;
  }, {} as Record<string, { name: string; value: number }>);

  const allocationData = Object.values(groupedByType);
  
  // Colors for allocation chart
  const COLORS = ['#0052CC', '#36B37E', '#FFAB00', '#6554C0', '#00B8D9'];
  
  // Monthly investment amount
  const monthlyInvestment = userProfile.savings * 0.8; // 80% of monthly savings
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-display">Investment Recommendations</CardTitle>
        <Button variant="outline" size="sm">
          Rebalance Portfolio
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 flex flex-col items-center justify-center lg:col-span-1">
            <h3 className="text-lg font-medium mb-1">Recommended Allocation</h3>
            <p className="text-sm text-muted-foreground mb-4">Based on your risk profile</p>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                  label={({name, value}) => `${name} ${value}%`}
                  labelLine={true}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`} 
                  labelFormatter={(label) => `Allocation: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm mt-2">
              Monthly Investment: <span className="font-bold">{formatCurrency(monthlyInvestment)}</span>
            </p>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Recommended Investments</h3>
            <div className="space-y-4">
              {investmentRecommendations.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <h4 className="font-medium">{item.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
                        {item.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
                        {item.risk} Risk
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
                        {item.returns.projected}% Expected Return
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{item.allocation}%</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(monthlyInvestment * (item.allocation / 100))} / month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-muted/40 rounded-lg">
          <h3 className="font-medium mb-2">AI Wealth Guardian Insights:</h3>
          <ul className="text-sm space-y-1">
            <li>• Your allocation prioritizes long-term growth with a moderate risk approach</li>
            <li>• Increasing your SIP by ₹5,000 could help reach your home down payment goal 4 months earlier</li>
            <li>• Your emergency fund should reach target in 8 months at current savings rate</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentRecommendations;
