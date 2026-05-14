import { useState } from "react";
import AnalyticChart from "../components/analitics-page-components/AnalyticChart";
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
    <div className="flex min-h-screen bg-base-200 md:ml-64">
      <TransactionNav />
      <div className="w-full pb-24 md:pb-6">
        <AnalyticChart
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
