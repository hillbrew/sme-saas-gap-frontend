import {
  ArrowLeft,
  Mail,
  Calendar,
  CreditCard,
  Building2,
  Eye,
  Edit2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCompanies } from "../../redux/thunk/Thunk";

const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("companies");

  const companies = useSelector((state) => state.customers.companies);
  const loading = useSelector((state) => state.customers.loading);
  const error = useSelector((state) => state.customers.error);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchUserCompanies(customerId));
    }
  }, [dispatch, customerId]);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin/customer-list")}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Customers
      </button>

      <div className="bg-white rounded-xl border p-6 mb-6 flex justify-between">
        <h1 className="text-xl font-semibold">
          Customer Details
        </h1>

        <button className="flex items-center px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Customer
        </button>
      </div>

      <div className="bg-white rounded-xl border">
        <div className="flex gap-8 px-6 border-b">
          {["companies", "subscription", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Companies Tab */}
       {activeTab === "companies" && (
  <div className="mt-4 bg-white rounded-lg max-h-[60vh] shadow-sm border overflow-x-auto">

    {loading && (
      <p className="text-gray-500 p-4">Loading companies...</p>
    )}

    {error && (
      <p className="text-red-500 p-4">{error}</p>
    )}

    {!loading && companies.length === 0 && (
      <p className="text-gray-500 p-4">No companies found</p>
    )}

    {!loading && companies.length > 0 && (
      <table className="w-full text-sm">
        <thead className=" border-b sticky top-0 bg-gray-50 z-10 ">
          <tr className="text-gray-600 text-xs uppercase tracking-wide">
            <th className="text-left px-4 py-3">Company</th>
            <th className="text-center px-4 py-3">Status</th>
            <th className="text-center px-4 py-3">Country</th>
            <th className="text-center px-4 py-3">Users</th>
            <th className="text-center px-4 py-3">Currency</th>
            <th className="text-center px-4 py-3">Created</th>
            <th className="text-right px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {companies.map((company) => (
            <tr 
              key={company.id} 
              className="hover:bg-gray-50 transition"
            >
              {/* Company */}
              <td className="px-4 py-3 flex items-center gap-2 font-medium">
                <Building2 className="w-4 h-4 text-gray-500" />
                {company.name}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    company.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {company.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* Country */}
              <td className="px-4 py-3 text-center text-gray-700">
                {company.country}
              </td>

              {/* Users */}
              <td className="px-4 py-3 text-center font-medium">
                {company.users_count}
              </td>

              {/* Currency */}
              <td className="px-4 py-3 text-center">
                {company.base_currency}
              </td>

              {/* Created Date */}
              <td className="px-4 py-3 text-center text-gray-600">
                {new Date(company.created_at).toLocaleDateString()}
              </td>

              {/* Action */}
              <td className="px-4 py-3 text-right">
              <button
  onClick={() =>
    navigate(`/admin/company/${company.id}/users`)
  }
  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
>
  View Users
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

  </div>
)}


          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <p className="text-gray-500">Subscription API coming soon...</p>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <p className="text-gray-500">Activity API coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
