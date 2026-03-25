import "../assets/styles/MainPage.css";
import DashboardMobile from "../components/main-page-components/DashboardMobile";
import DashboardHeaderMobile from "../components/main-page-components/DashboardHeaderMobile"
import DashboardDesktop from "../components/main-page-components/DashboardDesktop";

const MainPage = () => {
  return (
    <div>
      <DashboardHeaderMobile/>
    <main className="main_layout">
      <DashboardMobile/>
      <DashboardDesktop/>
    </main>
    </div>
  );
};

export default MainPage;
