import { Routes, Route } from "react-router-dom";
import { LoginPage} from "./pages/authentication/Login"
import { TwoFactorPage } from "./pages/authentication/TwoFactor";
import { Enable2FA } from "./pages/authentication/Enable2FA";
import Dashboard from "./pages/dashboard/Dashboard"
import ProtectedRoute from "./components/routes/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/2fa" element={<TwoFactorPage />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings/2fa"
        element={
          <ProtectedRoute>
            <Enable2FA />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
