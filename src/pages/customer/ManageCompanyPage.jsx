import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerSubscriptionPanel from "../../components/subscription/CustomerSubscriptionPanel";
import CompanyUsersPage from "./CompanyUsersPage";
import CompanyProfileCard from "../../components/customer/CompanyProfileCard";

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

console.log("selectedCompany",selectedCompany)
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

const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900 break-all">
      {value ?? "-"}
    </span>
  </div>
);



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

     {selectedCompany && (
  <div className="bg-white border rounded-xl p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4">Company Details</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <Detail label="Company ID" value={selectedCompany.id} />
      <Detail label="Name" value={selectedCompany.name} />
      <Detail label="Country" value={selectedCompany.country} />
      <Detail label="Base Currency" value={selectedCompany.base_currency} />
      <Detail label="Role" value={selectedCompany.role} />
      <Detail
        label="Status"
        value={selectedCompany.is_active ? "Active" : "Inactive"}
      />
      <Detail
        label="Membership"
        value={selectedCompany.membership_status ? "Active" : "Inactive"}
      />
      <Detail
        label="Users Count"
        value={selectedCompany.users_count}
      />
      <Detail
        label="Onboarding Completed"
        value={selectedCompany.onboarding_completed ? "Yes" : "No"}
      />
      <Detail
        label="Onboarding Stage"
        value={selectedCompany.onboarding_stage}
      />
      <Detail
        label="Created At"
        value={new Date(selectedCompany.created_at).toLocaleString()}
      />
      <Detail
        label="Tax ID"
        value={selectedCompany.tax_id}
      />
    </div>
  </div>
)}

      {/* Tabs */}
      <div className="bg-white rounded-xl border">
        <div className="flex gap-8 px-6 border-b">
          {["users", "subscription", "company activity", "profile"].map((tab) => (
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
            <CompanyUsersPage/>
          )}

          {activeTab === "subscription" && (
            // <CompanySubscriptionTab companyId={companyId} />
                           <CustomerSubscriptionPanel companyId={companyId} />


          )}
          {activeTab === "profile" && (
            <CompanyProfileCard companyId={companyId}/>
          )}

          {activeTab === "company activity" && (
            // <CompanyActivityTab companyId={companyId} />
                        <div>Coming Soon</div>

          )}
        
        </div>
      </div>
    </div>
  );
};

export default ManageCompanyPage;
