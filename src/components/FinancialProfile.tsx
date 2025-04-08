
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { userProfile } from '@/utils/financialData';
import { formatCurrency } from '@/utils/investmentCalculations';
import DataCard from '@/components/ui/DataCard';
import ProgressCircle from '@/components/ui/ProgressCircle';

const FinancialProfile = () => {
  const savingsRate = Math.round((userProfile.savings / userProfile.income) * 100);
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-fintech-blue-dark">
              Welcome back, {userProfile.name}
            </h2>
            <p className="text-muted-foreground">{userProfile.occupation} | {userProfile.location}</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 bg-muted/50 rounded-lg py-2 px-4">
            <div className="mr-4">
              <p className="text-sm text-muted-foreground">Behavior Profile</p>
              <p className="font-medium">{userProfile.behavior}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Tolerance</p>
              <p className="font-medium">{userProfile.riskTolerance}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DataCard
            title="Monthly Income"
            value={formatCurrency(userProfile.income)}
            subtitle="After tax"
          />
          
          <DataCard
            title="Monthly Expenses"
            value={formatCurrency(userProfile.expenses)}
            subtitle="Average over 6 months"
          />
          
          <DataCard
            title="Monthly Savings"
            value={formatCurrency(userProfile.savings)}
            subtitle="Available for investments"
          />
          
          <div className="fintech-card flex items-center justify-between">
            <div>
              <h3 className="fintech-label">Savings Rate</h3>
              <p className="text-sm text-muted-foreground mt-1">Of total income</p>
            </div>
            <ProgressCircle 
              value={savingsRate} 
              max={100} 
              size={80} 
              valueClassName={savingsRate >= 30 ? "text-fintech-green" : "text-fintech-gold"}
            />
          </div>
        </div>
        
        {userProfile.loans.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Active Loans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userProfile.loans.map((loan, index) => (
                <div key={index} className="fintech-card">
                  <h3 className="fintech-label">{loan.type}</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <p className="fintech-stats text-2xl">
                      {formatCurrency(loan.remainingAmount)}
                    </p>
                    <span className="text-sm text-muted-foreground">of {formatCurrency(loan.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>EMI: {formatCurrency(loan.emi)}</span>
                    <span>Rate: {loan.interestRate}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-3">
                    <div 
                      className="h-2 bg-fintech-blue rounded-full" 
                      style={{ width: `${((loan.amount - loan.remainingAmount) / loan.amount) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-muted-foreground mt-1">
                    {loan.remainingTenure} months remaining
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialProfile;
