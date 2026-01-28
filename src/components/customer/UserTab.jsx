import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyUsers, updateCompanyUserRole } from "../../redux/thunk/thunk";

const ALL_ROLES = ["ACCOUNTANT", "AUDITOR", "VIEWER"];

const UsersTab = ({ companyId, onAddUsers, onDeactivate, onActivate, userRole, userEmail }) => {
  const dispatch = useDispatch();
  const { companyUsers: users = [], loading, error } = useSelector(
    (state) => state.companyUsers || {}
  );

  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyUsers(companyId));
  }, [dispatch, companyId]);

  const handleRoleUpdate = (userId) => {
    if (!selectedRole) return;
    dispatch(updateCompanyUserRole({ companyId, userId, role: selectedRole }))
      .then(() => {
        setEditingUserId(null);
        setSelectedRole("");
        dispatch(fetchCompanyUsers(companyId));
      })
      .catch((err) => console.error("Role update failed:", err));
  };

  return (
    <div>
      {userRole === "OWNER" && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Company Users</h2>
          <button
            onClick={onAddUsers}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Activate Users
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center py-12 text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-center py-12 text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No users found</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userInfo = user.tsbr_users_tbks_company_users_user_idTotsbr_users;
              const isOwner = user.role === "OWNER";

              return (
                <tr key={user.user_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{userInfo?.email || "-"}</td>

                  {/* Role */}
                  <td className="py-3 px-4">
                    {isOwner ? (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        OWNER
                      </span>
                    ) : editingUserId === user.user_id ? (
                      <div className="flex gap-2 items-center">
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="border px-2 py-1 text-xs rounded"
                        >
                          <option value="" disabled>
                            Select role
                          </option>
                          {ALL_ROLES.filter((r) => r !== user.role).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleRoleUpdate(user.user_id)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingUserId(null);
                            setSelectedRole("");
                          }}
                          className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded">{user.role}</span>
                        <button
                          onClick={() => setEditingUserId(user.user_id)}
                          className="text-blue-600 text-xs cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    {!isOwner && userEmail !== userInfo?.email && (
                      <>
                        {user.is_active ? (
                          <button
                            onClick={() => onDeactivate(user)} // show confirmation modal
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded cursor-pointer"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => onActivate(user)} // show confirmation modal
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded cursor-pointer"
                          >
                            Activate
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTab;
