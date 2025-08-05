// Mock API functions for DPR Monitoring App

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate network latency
const simulateNetworkDelay = () => delay(Math.random() * 1000 + 500);

// Mock data for installation progress
const installationProgressData = [
  { date: 'Jan 19', dailyInstalled: 0, label: 'Jan 19' },
  { date: 'Jan 20', dailyInstalled: 1, label: 'Jan 20' },
  { date: 'Jan 21', dailyInstalled: 3, label: 'Jan 21' },
  { date: 'Jan 22', dailyInstalled: 1, label: 'Jan 22' },
  { date: 'Jan 23', dailyInstalled: 2, label: 'Jan 23' },
];

// Mock data for crane utilization
const craneUtilizationData = [
  { name: 'Active', value: 65, color: '#8884d8' },
  { name: 'Idle', value: 25, color: '#82ca9d' },
  { name: 'Maintenance', value: 10, color: '#ffc658' },
];

// Mock data for DPR reports
const dprReportsData = [
  {
    id: 1,
    date: 'Jan 23',
    state: 'Karnataka',
    siteName: 'Sandur Wind Farm',
    location: 'Block 1 - Phase A',
    craneIds: 'CR-001, CR-002, CR-003',
    workDone: 'WTG Assembly & Installation',
    totalWtg: 15,
    currentWtg: 2,
    status: 'Approved',
    statusColor: 'green',
  },
  {
    id: 2,
    date: 'Jan 22',
    state: 'Karnataka',
    siteName: 'Sandur Wind Farm',
    location: 'Block 2 - Phase A',
    craneIds: 'CR-004, CR-005',
    workDone: 'Foundation Work',
    totalWtg: 13,
    currentWtg: 1,
    status: 'Submitted',
    statusColor: 'blue',
  },
  {
    id: 3,
    date: 'Jan 21',
    state: 'Tamil Nadu',
    siteName: 'Tirunelveli Wind Project',
    location: 'Block 1 - Phase B',
    craneIds: 'CR-001, CR-006, CR-007, CR-008',
    workDone: 'Tower Installation',
    totalWtg: 28,
    currentWtg: 3,
    status: 'Pending',
    statusColor: 'yellow',
  },
  {
    id: 4,
    date: 'Jan 20',
    state: 'Karnataka',
    siteName: 'Sandur Wind Farm',
    location: 'Block 1 - Phase A',
    craneIds: 'CR-002, CR-009',
    workDone: 'Blade Installation',
    totalWtg: 12,
    currentWtg: 1,
    status: 'Approved',
    statusColor: 'green',
  },
  {
    id: 5,
    date: 'Jan 19',
    state: 'Rajasthan',
    siteName: 'Jaisalmer Wind Park',
    location: 'Block 3 - Phase C',
    craneIds: 'CR-010',
    workDone: 'Site Preparation',
    totalWtg: 8,
    currentWtg: 0,
    status: 'Rejected',
    statusColor: 'gray',
  },
];

// API functions
export const getInstallationProgressData = async () => {
  await simulateNetworkDelay();
  
  // Simulate occasional errors
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch installation progress data');
  }
  
  return {
    success: true,
    data: installationProgressData,
  };
};

export const getCraneUtilizationData = async () => {
  await simulateNetworkDelay();
  
  // Simulate occasional errors
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch crane utilization data');
  }
  
  return {
    success: true,
    data: craneUtilizationData,
  };
};

export const getDPRReports = async (filters = {}) => {
  await simulateNetworkDelay();
  
  // Simulate occasional errors
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch DPR reports');
  }
  
  let filteredData = [...dprReportsData];
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredData = filteredData.filter(report => 
      report.siteName.toLowerCase().includes(searchTerm) ||
      report.location.toLowerCase().includes(searchTerm) ||
      report.state.toLowerCase().includes(searchTerm) ||
      report.workDone.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.status) {
    filteredData = filteredData.filter(report => 
      report.status.toLowerCase() === filters.status.toLowerCase()
    );
  }
  
  if (filters.state) {
    filteredData = filteredData.filter(report => 
      report.state.toLowerCase() === filters.state.toLowerCase()
    );
  }
  
  return {
    success: true,
    data: filteredData,
    total: filteredData.length,
  };
};

// Dashboard summary data
export const getDashboardSummary = async () => {
  await simulateNetworkDelay();
  
  return {
    success: true,
    data: {
      totalSites: 5,
      activeCranes: 12,
      completedWtg: 76,
      pendingReports: 3,
      todayProgress: {
        wtgInstalled: 2,
        hoursWorked: 8.5,
        efficiency: 85,
      },
    },
  };
};

// Export functions
export const exportToPDF = async (data, filename = 'dpr-reports.pdf') => {
  await delay(2000); // Simulate export processing time
  
  // Simulate PDF generation
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace('.pdf', '.csv'); // Fallback to CSV
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  return { success: true, message: 'Report exported successfully' };
};

export const exportToExcel = async (data, filename = 'dpr-reports.xlsx') => {
  await delay(1500); // Simulate export processing time
  
  // Simulate Excel generation
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace('.xlsx', '.csv'); // Fallback to CSV
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  return { success: true, message: 'Report exported successfully' };
};

// Helper function to convert data to CSV
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Real-time data simulation
export const subscribeToRealTimeUpdates = (callback) => {
  const interval = setInterval(() => {
    // Simulate real-time updates
    const randomUpdate = {
      type: 'crane_status_update',
      craneId: `CR-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
      status: ['Active', 'Idle', 'Maintenance'][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString(),
    };
    
    callback(randomUpdate);
  }, 30000); // Update every 30 seconds
  
  return () => clearInterval(interval);
};
