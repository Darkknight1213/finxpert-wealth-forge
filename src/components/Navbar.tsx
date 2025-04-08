
import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-fintech-blue flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-display text-fintech-blue-dark">
            FinXpert
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Investments</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Goals</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Learn</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex">Financial Chatbot</Button>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
