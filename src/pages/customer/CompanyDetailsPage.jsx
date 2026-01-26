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
  import { fetchUserCompanies,deleteCompany } from "../../redux/thunk/Thunk";
  import CustomerOverview from "../../components/customer/CustomerOverview";
  import {
    activateCompany,
    deactivateCompany,
  } from "../../redux/thunk/Thunk";
  import { clearCompanyActionState } from "../../redux/slices/companyActionSlice";
  import CompanyActionsMenu from "../../components/customer/CompanyActionsMenu";
import SessionManagement from "../../components/session/SessionManagement";
import CustomerSubscriptionPanel from "../../components/subscription/CustomerSubscriptionPanel";


const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState("companies");
  const [openActionCompanyId, setOpenActionCompanyId] = useState(null);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  
  
  
  const companies = useSelector((state) => state.customers.companies);
    console.log("companies",companies)
    const loading = useSelector((state) => state.customers.companiesLoading);
    const error = useSelector((state) => state.customers.companiesError);
    const {customers,companiesForCustomerId} = useSelector(
      (state) => state.customers
    );

    const customer = customers.find(
      (c) => c.id === customerId
    );

    const {
      actionLoading,
      actionError,
      lastAction,
      affectedUsersCount,
      lastActionCompanyId,

    } = useSelector((state) => state.companyActions);

    const handleDeactivate = (companyId) => {
      dispatch(deactivateCompany(companyId));
    };

    const handleActivate = (companyId) => {
      dispatch(activateCompany(companyId));
    };

    const openActions = (companyId) => {
      dispatch(clearCompanyActionState());
      setOpenActionCompanyId(companyId);
    };

    const closeActions = () => {
      dispatch(clearCompanyActionState());
      setOpenActionCompanyId(null);
    };

    const handleDeleteCompany = (companyId) => {
      dispatch(deleteCompany(companyId));
      dispatch(fetchUserCompanies(customerId)); 
    };


    useEffect(() => {
    if (!customerId) return;

    if (companies.length > 0 && companiesForCustomerId === customerId) {
      return;
    }

    dispatch(fetchUserCompanies(customerId));
  }, [dispatch, customerId]);

  useEffect(() => {
    if (!actionLoading && lastActionCompanyId) {
    setOpenActionCompanyId(null);
    }
   }, [actionLoading, lastActionCompanyId]);


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
          {customer ? (
            <CustomerOverview customer={customer} />
          ) : (
            <div className="bg-white border rounded-xl p-6 mb-6 text-gray-500">
              Customer not found
            </div>
          )}
          {/* <button className="flex items-center px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Customer
          </button> */}
        </div>

        <div className="bg-white rounded-xl border">
          <div className="flex gap-8 px-6 border-b">
            {["companies", "subscription", "activity", "session"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 ${activeTab === tab
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
                        <th className="text-center px-4 py-3">Role</th>
                        <th className="text-center px-4 py-3">Country</th>
                        <th className="text-center px-4 py-3">Users</th>
                        <th className="text-center px-4 py-3">Currency</th>
                        <th className="text-center px-4 py-3">Created</th>
                        <th className="text-right px-4 py-3">Actions</th>
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
                              className={`text-xs font-medium px-3 py-1 rounded-full ${company.is_active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                                }`}
                            >
                              {company.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>

                            <td className="px-4 py-3 text-center">
                            <span
                              className={`text-xs font-medium px-3 py-1 rounded-full ${company.role === "OWNER"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              {company.role}
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
                        <td className="px-4 py-3 text-right relative">
                          <div className="inline-flex items-center gap-3">
                            <button
                              onClick={() =>
                                navigate(`/admin/company/${company.id}/users`)
                              }
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Users
                            </button>

                            <button
                              onClick={() => openActions(company.id)}
                              className="text-sm text-gray-600 hover:text-gray-900"
                            >
                              More
                            </button>
                          </div>

                          {openActionCompanyId === company.id && (
                            <CompanyActionsMenu
                              company={company}
                              onDeactivate={handleDeactivate}
                              onActivate={handleActivate}
                              onDelete={handleDeleteCompany}
                              actionLoading={actionLoading}
                              lastActionCompanyId={lastActionCompanyId}
                              onClose={closeActions}
                            />
                          )}
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
               <CustomerSubscriptionPanel userId={customerId} />
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <p className="text-gray-500">Activity API coming soon...</p>
            )}
             {activeTab === "session" && (
              <SessionManagement userId ={customerId}/>
            )}
          </div>
        </div>

        {deleteCompanyId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Delete Company</h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this company?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancelDelete}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          No
        </button>

        <button
          onClick={handleConfirmDelete}
          disabled={actionLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    );
  };

  export default CustomerDetailPage;
