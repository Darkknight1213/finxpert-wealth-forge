
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { educationModules } from '@/utils/financialData';

const EducationSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-display">Financial Education</CardTitle>
        <Button variant="outline" size="sm">View All Modules</Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Enhance your financial literacy with these personalized learning modules
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationModules.slice(0, 4).map((module) => (
            <div key={module.id} className="fintech-card hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">{module.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  module.difficulty === 'Beginner' 
                    ? 'bg-fintech-green/20 text-fintech-green' 
                    : module.difficulty === 'Intermediate'
                    ? 'bg-fintech-gold/20 text-fintech-gold'
                    : 'bg-fintech-red/20 text-fintech-red'
                }`}>
                  {module.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              
              <div className="space-y-2 mb-4">
                {module.topics.slice(0, 2).map((topic, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-fintech-blue mr-2"></div>
                    <span>{topic}</span>
                  </div>
                ))}
                {module.topics.length > 2 && (
                  <p className="text-xs text-muted-foreground pl-4">
                    +{module.topics.length - 2} more topics
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{module.duration}</span>
                <Button size="sm">Start Learning</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-fintech-blue/10 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="font-medium text-fintech-blue-dark">Financial Chatbot Assistant</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 md:mb-0">
              Ask any financial question or get guidance on your investment journey
            </p>
          </div>
          <Button>Open Financial Chatbot</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
