import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerSubscriptionPanel from "../../components/subscription/CustomerSubscriptionPanel";

// import CompanyUsersTab from "../../components/company/CompanyUsersTab";
// import CompanySubscriptionTab from "../../components/company/CompanySubscriptionTab";
// import CompanyActivityTab from "../../components/company/CompanyActivityTab";
// import { fetchCompanyById } from "../../redux/thunk/Thunk";

const ManageCompanyPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState(null);


  const [activeTab, setActiveTab] = useState("subscription");
  const companies = useSelector((state) => state.customers.companies);

console.log("companies",companies)
//   const { selectedCompany, loading, error } = useSelector(
//     (state) => state.company
//   );

useEffect(() => {
  if (!companyId || !companies?.length) return;

  const company = companies.find(
    (c) => String(c.id) === String(companyId)
  );

  setSelectedCompany(company || null);
}, [companyId, companies]);


//   useEffect(() => {
//     if (companyId) {
//       dispatch(fetchCompanyById(companyId));
//     }
//   }, [companyId]);

//   if (loading) return <p className="p-6">Loading company...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!selectedCompany) return null;

  return (
    <div className="p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h1 className="text-xl font-semibold">{selectedCompany?.name}</h1>
        <p className="text-sm text-gray-500">
          {selectedCompany?.country} · {selectedCompany?.base_currency}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border">
        <div className="flex gap-8 px-6 border-b">
          {["users", "subscription", "activity"].map((tab) => (
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
          {activeTab === "users" && (
            // <CompanyUsersTab companyId={companyId} />
            <div>users</div>
          )}

          {activeTab === "subscription" && (
            // <CompanySubscriptionTab companyId={companyId} />
                           <CustomerSubscriptionPanel companyId={companyId} />


          )}

          {activeTab === "activity" && (
            // <CompanyActivityTab companyId={companyId} />
                        <div>users</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCompanyPage;
