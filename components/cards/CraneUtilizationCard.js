import React from 'react';
import { useCraneUtilization } from '../../hooks/useDPRData';
import LoadingSkeleton from '../LoadingSkeleton';
import CustomPieChart from '../charts/CustomPieChart';

const CraneUtilizationCard = () => {
  const { data, loading, error } = useCraneUtilization();

  return (
    <section className="card flex flex-col gap-6 rounded-xl border p-6">
      <header className="card-header">
        <h4 className="card-title flex items-center gap-2 text-base">
          Crane Utilization
        </h4>
      </header>
      <div className="card-content">
        {loading && <LoadingSkeleton type="pie" />}
        {error && (
          <p className="text-destructive text-center">
            Unable to load crane utilization data.
          </p>
        )}
        {!loading && !error && data && <CustomPieChart data={data} />}
      </div>
    </section>
  );
};

export default CraneUtilizationCard;
