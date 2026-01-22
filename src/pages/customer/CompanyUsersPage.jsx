import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyUsers } from "../../redux/thunk/Thunk";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CompanyUsersPage = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyUsers, companyUsersLoading, companyUsersError } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyUsers(companyId));
    }
  }, [dispatch, companyId]);

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Company Users</h1>
      </div>

      {/* Content Card */}
      <div className="bg-white shadow rounded-xl p-4">
        {/* Loading */}
        {companyUsersLoading && (
          <p className="text-gray-500 text-center py-4">Loading users...</p>
        )}

        {/* Error */}
        {companyUsersError && (
          <p className="text-red-500 text-center py-4">{companyUsersError}</p>
        )}

        {/* No Users */}
        {!companyUsersLoading && companyUsers.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No users found for this company.
          </p>
        )}

        {/* Users Table */}
        {!companyUsersLoading && companyUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-gray-600 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-center">Role</th>
                  <th className="px-4 py-3 text-center">Active</th>
                  <th className="px-4 py-3 text-center">Verified</th>
                  <th className="px-4 py-3 text-center">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {(companyUsers || []).map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-4 py-3">
                      {user.tsbr_users_tbks_company_users_user_idTotsbr_users
                        ?.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center">{user.role}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {user.tsbr_users_tbks_company_users_user_idTotsbr_users
                        ?.is_verified
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyUsersPage;
