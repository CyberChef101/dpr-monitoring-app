import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import Dashboard from '../components/Dashboard';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Header />
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'dashboard' && <Dashboard />}
          {/* TODO: Add DPR Submission and DPR History components */}
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}
