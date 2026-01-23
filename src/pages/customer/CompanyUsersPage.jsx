import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyUsers,
  deactivateCompanyUser,
  activateCompanyUser,
  updateCompanyUserRole,
} from "../../redux/thunk/Thunk";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CompanyUsersPage = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use optional chaining to prevent undefined errors
  const { companyUsers: users = [], loading = false, error } = useSelector(
    (state) => state.companyUsers || {}
  );

  const [confirmData, setConfirmData] = useState(null);

  // Fetch users when companyId changes
  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyUsers(companyId));
    }
  }, [dispatch, companyId]);

  // Confirm action for Activate / Deactivate
  const handleConfirm = async () => {
    if (!confirmData) return;

    const { type, userId } = confirmData;

    try {
      if (type === "deactivate") {
        await dispatch(deactivateCompanyUser({ companyId, userId })).unwrap();
      } else {
        await dispatch(activateCompanyUser({ companyId, userId })).unwrap();
      }
      // Refresh users list after action
      dispatch(fetchCompanyUsers(companyId));
    } catch (err) {
      console.error("Action failed:", err);
    }

    setConfirmData(null);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Company Users</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {loading && <p className="text-center">Loading users...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Role</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {user?.tsbr_users_tbks_company_users_user_idTotsbr_users?.email || "N/A"}
                    </td>

                    <td className="p-3 text-center">
                      <select
                        value={user.role || "USER"}
                        onChange={(e) =>
                          dispatch(
                            updateCompanyUserRole({
                              companyId,
                              userId: user.id,
                              role: e.target.value,
                            })
                          )
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      {user.is_active ? (
                        <button
                          onClick={() =>
                            setConfirmData({ type: "deactivate", userId: user.id })
                          }
                          className="text-red-600 hover:underline text-sm"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setConfirmData({ type: "activate", userId: user.id })
                          }
                          className="text-green-600 hover:underline text-sm"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-3">Confirm Action</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to <strong>{confirmData.type}</strong> this user?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmData(null)}
                className="px-4 py-2 border rounded"
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded"
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

export default CompanyUsersPage;
