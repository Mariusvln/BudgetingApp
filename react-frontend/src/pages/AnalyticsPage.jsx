import { useState } from "react";
import AnaliticChart from "../components/analitics-page-components/AnalyticChart";
import TransactionNav from "../components/TransactionNav";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getInitialDateRange = () => {
  const today = new Date();
  return {
    start: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
    end: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
  };
};

const AnalyticsPage = () => {
  const initialRange = getInitialDateRange();
  const [dateStart, setDateStart] = useState(initialRange.start);
  const [dateEnd, setDateEnd] = useState(initialRange.end);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <TransactionNav />
      <main className="min-h-screen px-4 pb-28 pt-5 sm:px-6 md:ml-64 md:px-8 md:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm md:flex-row md:items-end md:justify-between md:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Analytics
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Financial trends
              </h1>
              <p className="mt-2 text-sm text-base-content/60">
                Compare income and expenses across your selected date range.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Date start
                </span>
              <input
                type="date"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
                  className="input input-bordered h-11 rounded-xl bg-base-200/70"
              />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Date end
                </span>
              <input
                type="date"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
                  className="input input-bordered h-11 rounded-xl bg-base-200/70"
              />
              </label>
            </div>
          </div>

          <AnaliticChart dateStart={dateStart} dateEnd={dateEnd} />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
