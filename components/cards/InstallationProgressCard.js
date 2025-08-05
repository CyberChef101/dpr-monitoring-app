import React from 'react';
import { useInstallationProgress } from '../../hooks/useDPRData';
import LoadingSkeleton from '../LoadingSkeleton';
import CustomBarChart from '../charts/CustomBarChart';

const InstallationProgressCard = () => {
  const { data, loading, error } = useInstallationProgress();

  return (
    <section className="card flex flex-col gap-6 rounded-xl border p-6">
      <header className="card-header">
        <h4 className="card-title flex items-center gap-2 text-base">
          Daily WTG Installation Progress
        </h4>
      </header>
      <div className="card-content">
        {loading && <LoadingSkeleton type="bar" />}
        {error && (
          <p className="text-destructive text-center">
            Unable to load installation progress data.
          </p>
        )}
        {!loading && !error && data && <CustomBarChart data={data} />}
      </div>
    </section>
  );
};

export default InstallationProgressCard;
