import "./App.css";
import HeroMaster from "./components/HeroMaster";
import MainPage from "./pages/MainPage";
import TransactionNav from "./components/TransactionNav";
import TransactionRecentTable from "./components/TransactionRecentTable";
import LoginPage from "./pages/loginPage";
import TransactionsPage from "./pages/TransactionsPage";
import HeroPage from "./pages/HeroPage";
import RegisterPage from "./pages/RegisterPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Logout from "./components/Logout";

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<TransactionsPage />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
