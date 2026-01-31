import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

// Auth
import { LoginPage } from "./pages/authentication/Login";
import { TwoFactorPage } from "./pages/authentication/TwoFactor";
import { Enable2FA } from "./pages/authentication/Enable2FA";

import Dashboard from "./pages/dashboard/Dashboard";
import { CustomersListPage } from "./pages/customer/CustomersListPage";
import CustomerDetailPage from "./pages/customer/CompanyDetailsPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CompanyInfoPage from "./pages/customer/CompanyInfoPage";
import SessionManagement from "./components/session/SessionManagement";
import ManageCompanyPage from "./pages/customer/ManageCompanyPage";
import PlanManager from "./pages/plans/PlansCrudTable";
import Products from "./pages/product/Products";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage/>} />
      <Route path="/admin/2fa" element={<TwoFactorPage/>} />
      <Route path="settings/2fa" element={<Enable2FA/>} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/company/:companyId" element={<CompanyInfoPage />}/>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customer-list" element={<CustomersListPage />} />
        {/* <Route  element={<CustomerDetailPage />} */}
           <Route path="products" element={<Products></Products>} />
        <Route path="/admin/customer-detail/:customerId" element={<CustomerDetailPage/>} />
        <Route path="/admin/manage-company/:companyId" element={<ManageCompanyPage/>} />
          <Route path="/admin/sessions" element={<SessionManagement></SessionManagement>}></Route>
          <Route path="/admin/plans-manager" element={<PlanManager></PlanManager>} />
          </Route>
    </Routes>
  );
}
