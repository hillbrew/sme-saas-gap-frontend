import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import UsersTab from "../../components/customer/UserTab";
import AddUsersModal from "../../components/customer/AddUsersModal";

import {
  fetchCompanyUsers,
  fetchInactiveCompanyUsers,
  deactivateCompanyUser,
  activateCompanyUser,
  updateCompanyUserRole,
} from "../../redux/thunk/Thunk";
import ConfirmActionModal from "../../components/customer/ConfirmActionModal";

const CompanyUsersPage = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyUsers: users = [], inactiveUsers = [], loading = false, error } =
    useSelector((state) => state.companyUsers || {});

  const [showModal, setShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState(null);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyUsers(companyId));
    }
  }, [dispatch, companyId]);

  const handleAddUsers = () => {
    if (!companyId) return;
    dispatch(fetchInactiveCompanyUsers(companyId));
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);



const handleUpdateRole = (userId) => {
  if (!selectedRole) return;
  dispatch(updateCompanyUserRole({ companyId, userId, role: selectedRole }))
    .unwrap()
    .then(() => {
      setEditingUserId(null);
      setSelectedRole("");
      dispatch(fetchCompanyUsers(companyId));
    })
    .catch((err) => console.error("Role update failed:", err));
};


const handleActivateUser = ({ companyId, userId }) => {
  if (!companyId || !userId) return console.error("Missing companyId or userId");

  dispatch(activateCompanyUser({ companyId, userId }))
    .unwrap()
        .then(() => {
      dispatch(fetchCompanyUsers(companyId));
      setShowModal(false); 
    })
    .catch(err => console.error("Activation failed:", err));
};


const handleDeactivateUser = (user) => {
  if (!companyId || !user.user_id) {
    return console.error("Missing companyId or userId", { companyId, user });
  }
  dispatch(deactivateCompanyUser({ companyId, userId: user.user_id }))
    .unwrap()
    .then(() => dispatch(fetchCompanyUsers(companyId)))
    .catch((err) => console.error("Deactivation failed:", err));
};



const handleConfirm = async () => {
  if (!confirmData) return;

  const { type, user } = confirmData;

  try {
    const payload = { companyId, userId: user.user_id };

    if (type === "deactivate") {
      await dispatch(deactivateCompanyUser(payload)).unwrap();
    } else {
      await dispatch(activateCompanyUser(payload)).unwrap();
    }

    dispatch(fetchCompanyUsers(companyId));
  } catch (err) {
    console.error("Action failed:", err);
    alert(err.message || "Action rejected by server");
  }

  setConfirmData(null);
};




  return (
    <div className="p-4 bg-gray-50 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Company Users</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <UsersTab
          companyId={companyId}
  onAddUsers={handleAddUsers}
  onDeactivate={handleDeactivateUser} 
  onActivate={handleActivateUser}     
  onUpdateRole={handleUpdateRole}
  userRole="OWNER"   
  userEmail="" 
        />
      </div>

     {showModal && (
  <AddUsersModal
    inactiveUsers={inactiveUsers}
    onActivateUser={handleActivateUser}
    onClose={handleCloseModal}
    companyId={companyId} 
  />
)}

    {confirmData && (
  <ConfirmActionModal
    title="Confirm User Action"
    message={`Are you sure you want to ${confirmData.type} this user?`}
    confirmLabel={confirmData.type === "deactivate" ? "Deactivate" : "Activate"}
    cancelLabel="Cancel"
    onConfirm={handleConfirm}
    onCancel={() => setConfirmData(null)}
    loading={loading}
  />
)}


   

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default CompanyUsersPage;
