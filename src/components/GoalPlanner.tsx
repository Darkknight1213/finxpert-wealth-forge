
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/utils/financialData';
import { formatCurrency } from '@/utils/investmentCalculations';
import ProgressCircle from '@/components/ui/ProgressCircle';

const GoalPlanner = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-display">Financial Goals</CardTitle>
        <Button variant="outline" size="sm">
          Add New Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userProfile.financialGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const remainingAmount = goal.target - goal.current;
            
            let progressColor;
            if (progress < 30) progressColor = "text-fintech-red";
            else if (progress < 70) progressColor = "text-fintech-gold";
            else progressColor = "text-fintech-green";
            
            return (
              <div key={goal.id} className="fintech-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <p className="text-muted-foreground text-sm">Target: {formatCurrency(goal.target)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    goal.priority === 'High' 
                      ? 'bg-fintech-red/20 text-fintech-red' 
                      : goal.priority === 'Medium'
                      ? 'bg-fintech-gold/20 text-fintech-gold'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {goal.priority} Priority
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold">{formatCurrency(goal.current)}</p>
                    <p className="text-sm text-muted-foreground">Current amount</p>
                    
                    <div className="mt-2">
                      <p className="text-sm font-medium">{formatCurrency(remainingAmount)}</p>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                  
                  <ProgressCircle 
                    value={Math.round(progress)} 
                    max={100}
                    size={90}
                    valueClassName={progressColor}
                    label="complete"
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm flex justify-between">
                    <span>Timeline:</span>
                    <span className="font-medium">{goal.timeline} months</span>
                  </p>
                  <p className="text-sm flex justify-between mt-1">
                    <span>Monthly needed:</span>
                    <span className="font-medium">
                      {formatCurrency(remainingAmount / goal.timeline)}
                    </span>
                  </p>
                </div>
                
                <Button className="w-full mt-4" variant="outline">Adjust Goal</Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/40 rounded-lg text-sm">
          <h3 className="font-medium mb-2">AI Goal Planner Suggestions:</h3>
          <ul className="space-y-1">
            <li>• Increase your emergency fund monthly contribution by ₹5,000 to reach goal 3 months faster</li>
            <li>• Consider a high-yield FD for your vacation fund to maximize short-term returns</li>
            <li>• Your home down payment goal is on track with current SIP allocation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalPlanner;
