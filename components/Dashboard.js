import React from 'react';
import NavigationCard from './cards/NavigationCard';
import InstallationProgressCard from './cards/InstallationProgressCard';
import CraneUtilizationCard from './cards/CraneUtilizationCard';
import DPRReportsTable from './cards/DPRReportsTable';

const Dashboard = () => {
  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-5 gap-6">
      <section className="lg:col-span-1">
        <NavigationCard />
      </section>
      <section className="lg:col-span-2 space-y-6">
        <InstallationProgressCard />
        <CraneUtilizationCard />
      </section>
      <section className="lg:col-span-4">
        <DPRReportsTable />
      </section>
    </main>
  );
};

export default Dashboard;
