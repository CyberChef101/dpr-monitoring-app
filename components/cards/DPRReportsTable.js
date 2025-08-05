import React, { useState, useEffect } from 'react';
import { useDPRReports } from '../../hooks/useDPRData';
import LoadingSkeleton from '../LoadingSkeleton';
import { exportToPDF, exportToExcel } from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const DPRReportsTable = () => {
  const [filters, setFilters] = useState({ search: '' });
  const { data, loading, error, refetch } = useDPRReports(filters);
  const toast = useToast();

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(data);
      toast.success('Exported PDF successfully');
    } catch (err) {
      toast.error('Failed to export PDF');
    }
  };

  const handleExportExcel = async () => {
    try {
      await exportToExcel(data);
      toast.success('Exported Excel successfully');
    } catch (err) {
      toast.error('Failed to export Excel');
    }
  };

  return (
    <section className="card rounded-xl border p-6">
      <header className="card-header flex items-center justify-between">
        <h4 className="card-title text-base">DPR Reports Table</h4>
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="button button-outline h-8 rounded-md gap-1.5 px-3 text-sm font-medium"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="button button-outline h-8 rounded-md gap-1.5 px-3 text-sm font-medium"
          >
            Export Excel
          </button>
        </div>
      </header>
      <div className="card-content">
        <input
          type="text"
          placeholder="Search reports..."
          value={filters.search}
          onChange={handleSearchChange}
          className="input mb-4"
          aria-label="Search DPR reports"
        />
        {loading && <LoadingSkeleton rows={5} columns={10} />}
        {error && (
          <p className="text-destructive text-center">
            Unable to load DPR reports.
          </p>
        )}
        {!loading && !error && data && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm caption-bottom">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">State</th>
                  <th className="text-left p-2">Site Name</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">Crane IDs</th>
                  <th className="text-left p-2">Work Done</th>
                  <th className="text-left p-2">Total WTG</th>
                  <th className="text-left p-2">Current WTG</th>
                  <th className="text-left p-2">Photo</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/50 border-b">
                    <td className="p-2 whitespace-nowrap">{report.date}</td>
                    <td className="p-2 whitespace-nowrap">{report.state}</td>
                    <td className="p-2 max-w-xs truncate" title={report.siteName}>{report.siteName}</td>
                    <td className="p-2 max-w-xs truncate" title={report.location}>{report.location}</td>
                    <td className="p-2 max-w-xs truncate" title={report.craneIds}>{report.craneIds}</td>
                    <td className="p-2 max-w-xs truncate" title={report.workDone}>{report.workDone}</td>
                    <td className="p-2 whitespace-nowrap font-medium">{report.totalWtg}</td>
                    <td className="p-2 whitespace-nowrap text-blue-600 font-medium">+{report.currentWtg}</td>
                    <td className="p-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="button button-ghost h-8 rounded-md px-3"
                        aria-label={`View photo for report on ${report.date}`}
                      >
                        View
                      </button>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap ${
                          report.statusColor === 'green'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : report.statusColor === 'blue'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : report.statusColor === 'yellow'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : report.statusColor === 'gray'
                            ? 'bg-gray-100 text-gray-800 border-gray-200'
                            : 'bg-muted text-muted-foreground border-border'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default DPRReportsTable;
