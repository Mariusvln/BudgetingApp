import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import TransactionsPage from "./pages/TransactionsPage";
import HeroPage from "./pages/HeroPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

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
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<TransactionsPage />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
