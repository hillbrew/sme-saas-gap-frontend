import React from "react";

const AddUsersModal = ({
  inactiveUsers = [],
  onClose,
  onActivateUser,
  companyId, // <- pass this from parent
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Inactive Company Users
        </h2>

        <div className="max-h-[400px] overflow-y-auto">
          {inactiveUsers.length === 0 ? (
            <p className="text-gray-500 text-center">
              No inactive users found
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">Email</th>
                  <th className="text-left py-2 px-3 font-medium">Role</th>
                  <th className="text-left py-2 px-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {inactiveUsers.map((user, idx) => (
                  <tr
                    key={user.user_id}
                    className={`border-b ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="py-2 px-3">
                      {user.tsbr_users_tbks_company_users_user_idTotsbr_users?.email || "-"}
                    </td>
                    <td className="py-2 px-3">
                      {user.tsbr_users_tbks_company_users_user_idTotsbr_users?.role || "-"}
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() =>
                          onActivateUser({
                            companyId,           // include companyId
                            userId: user.user_id // userId from API
                          })
                        }
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUsersModal;
