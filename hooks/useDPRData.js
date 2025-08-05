import { useState, useEffect, useCallback } from 'react';
import { 
  getInstallationProgressData, 
  getCraneUtilizationData, 
  getDPRReports,
  getDashboardSummary 
} from '../utils/api';

export const useDPRData = (dataType, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (dataType) {
        case 'installationProgress':
          result = await getInstallationProgressData();
          break;
        case 'craneUtilization':
          result = await getCraneUtilizationData();
          break;
        case 'dprReports':
          result = await getDPRReports(options.filters);
          break;
        case 'dashboardSummary':
          result = await getDashboardSummary();
          break;
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }
      
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dataType, options.filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useInstallationProgress = () => {
  return useDPRData('installationProgress');
};

export const useCraneUtilization = () => {
  return useDPRData('craneUtilization');
};

export const useDPRReports = (filters = {}) => {
  return useDPRData('dprReports', { filters });
};

export const useDashboardSummary = () => {
  return useDPRData('dashboardSummary');
};

// Hook for real-time updates
export const useRealTimeUpdates = (callback) => {
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomUpdate = {
        type: 'status_update',
        timestamp: new Date().toISOString(),
        data: {
          craneId: `CR-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
          status: ['Active', 'Idle', 'Maintenance'][Math.floor(Math.random() * 3)],
        },
      };
      
      if (callback) {
        callback(randomUpdate);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [callback]);
};

// Hook for managing filters
export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const removeFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
    removeFilter,
    setFilters,
  };
};

// Hook for managing table state
export const useTableState = (initialState = {}) => {
  const [tableState, setTableState] = useState({
    page: 1,
    pageSize: 10,
    sortBy: null,
    sortOrder: 'asc',
    ...initialState,
  });

  const updateTableState = useCallback((updates) => {
    setTableState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetTableState = useCallback(() => {
    setTableState({
      page: 1,
      pageSize: 10,
      sortBy: null,
      sortOrder: 'asc',
      ...initialState,
    });
  }, [initialState]);

  return {
    tableState,
    updateTableState,
    resetTableState,
  };
};
