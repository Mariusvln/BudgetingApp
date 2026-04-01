import "./mockServer";
import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import TransactionsPage from "./pages/TransactionsPage";
import IncomesPage from "./pages/IncomesPage";
import HeroPage from "./pages/HeroPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminPage from "./pages/AdminPage";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeProvider";

import Logout from "./components/Logout";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/incomes" element={<IncomesPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<TransactionsPage />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
