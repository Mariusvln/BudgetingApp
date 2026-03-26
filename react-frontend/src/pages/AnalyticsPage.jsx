import AnaliticChart from "../components/analitics-page-components/AnalyticChart";
import TransactionNav from "../components/TransactionNav";
import AnalyticsHeader from "../components/analitics-page-components/AnalyticsHeader";

const AnalyticsPage = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64">
          <TransactionNav />
        </div>
        <div className="w-full">
          <AnalyticsHeader />
          <AnaliticChart />
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
