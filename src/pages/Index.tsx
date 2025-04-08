
import React from 'react';
import Navbar from '@/components/Navbar';
import FinancialProfile from '@/components/FinancialProfile';
import BehavioralAnalysis from '@/components/BehavioralAnalysis';
import InvestmentRecommendations from '@/components/InvestmentRecommendations';
import GoalPlanner from '@/components/GoalPlanner';
import EducationSection from '@/components/EducationSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-8">
        <FinancialProfile />
        <BehavioralAnalysis />
        <InvestmentRecommendations />
        <GoalPlanner />
        <EducationSection />
        
        <footer className="text-center text-muted-foreground text-sm py-6 mt-6 border-t">
          <p>FinXpert AI Wealth Guardian | Powered by Advanced AI</p>
          <p className="mt-2">© {new Date().getFullYear()} FinXpert - Breaking the Middle Class Trap</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
