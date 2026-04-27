import { useState } from "react";
import AnaliticChart from "../components/analitics-page-components/AnalyticChart";
import TransactionNav from "../components/TransactionNav";
import AnalyticsHeader from "../components/analitics-page-components/AnalyticsHeader";

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
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64">
        <TransactionNav />
      </div>
      <div className="w-full">
        <div className="ml-5 p-10 pb-0">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Date start
              </label>
              <input
                type="date"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Date end
              </label>
              <input
                type="date"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
              />
            </div>
          </div>
        </div>
        <AnalyticsHeader dateStart={dateStart} dateEnd={dateEnd} />
        <AnaliticChart dateStart={dateStart} dateEnd={dateEnd} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
