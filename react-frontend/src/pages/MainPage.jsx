import "../assets/styles/MainPage.css";
import DashboardMobile from "../components/DashboardMobile";
import DashboardHeaderMobile from "../components/DashboardHeaderMobile"
import DashboardDesktop from "../components/DashboardDesktop";

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
