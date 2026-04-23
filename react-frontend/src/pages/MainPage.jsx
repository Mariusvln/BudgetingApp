import "../assets/styles/MainPage.css";
import DashboardMobile from "../components/main-page-components/DashboardMobile";
import DashboardHeaderMobile from "../components/main-page-components/DashboardHeaderMobile"
import DashboardDesktop from "../components/main-page-components/DashboardDesktop";
import DashboardHeaderDesktop from "../components/main-page-components/DashboardHeaderDesktop";
import TransactionNav from "../components/TransactionNav";

const MainPage = () => {
  return (
    <div className="flex">
      <TransactionNav />
      <div className="h-screen flex flex-col bg-[#f3f4f6] pl-[3%] grow">
      <DashboardHeaderMobile/>
      <DashboardHeaderDesktop/>
    <main className="main_layout">
      <DashboardMobile/>
      <DashboardDesktop/>
    </main>
    </div>
    </div>
  );
};

export default MainPage;
