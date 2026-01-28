import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedPlan, selectPlans } from "../../redux/slices/PlansSlice";

import { fetchPlansManager, fetchEntitlements, updateEntitlements } from "../../redux/thunk/plansThunk";

const PlansCrudTable = () => {
  const dispatch = useDispatch();
  // const plans = useSelector(selectPlans);
  const {plans,entitlements,plansLoading,entitlementsLoading,updateLoading} = useSelector((state) => state.plans);

  const [selectedPlan, setSelectedPlanLocal] = useState(null);
  const [localState, setLocalState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loadingPlanCode, setLoadingPlanCode] = useState(null);

  // Fetch all plans
  useEffect(() => {
    dispatch(fetchPlansManager());
  }, [dispatch]);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch entitlements when editing a plan
  const handleEdit = async (planCode, planName) => {
    try {
      setLoadingPlanCode(planCode);
      const data = await dispatch(fetchEntitlements(planCode)).unwrap();
      setLocalState(data.entitlements || []);
      setSelectedPlanLocal({ code: planCode, name: planName });
      setModalOpen(true);
      setMessage({ text: "", type: "" });
    } catch (err) {
      setMessage({ text: "Failed to fetch entitlements", type: "error" });
      console.error("Failed to fetch entitlements", err);
    } finally {
      setLoadingPlanCode(null);
    }
  };

  // Update feature name
  const updateFeatureName = (oldName, newName) => {
    setLocalState((prev) =>
      prev.map((item) =>
        item.feature_name === oldName ? { ...item, feature_name: newName } : item
      )
    );
  };

  // Update feature value
  const updateFeatureValue = (name, value) => {
    setLocalState((prev) =>
      prev.map((item) =>
        item.feature_name === name ? { ...item, feature_value: value } : item
      )
    );
  };

  // Add new feature
  const addFeature = () => {
    const newFeature = { feature_name: "", feature_value: "" };
    setLocalState((prev) => [...prev, newFeature]);
  };

  // Delete feature with confirmation
  const handleDeleteFeature = (name) => {
    setConfirmDelete(name);
  };

  const confirmDeleteFeature = () => {
    setLocalState((prev) => prev.filter((item) => item.feature_name !== confirmDelete));
    setConfirmDelete(null);
    setMessage({ text: "Feature deleted", type: "info" });
  };

  // Validate entitlements
  const validateEntitlements = () => {
    if (!localState || localState.length === 0) {
      return "Cannot save: entitlements array is empty!";
    }
    
    const emptyNames = localState.some(item => !item.feature_name.trim());
    if (emptyNames) {
      return "All features must have a name!";
    }

    const duplicateNames = localState.some(
      (item, idx) => localState.findIndex(i => i.feature_name === item.feature_name) !== idx
    );
    if (duplicateNames) {
      return "Duplicate feature names are not allowed!";
    }

    return null;
  };

  // Save entitlements
  const handleSave = async () => {
    const validationError = validateEntitlements();
    if (validationError) {
      setMessage({ text: validationError, type: "error" });
      return;
    }

    try {
      setSaving(true);
      await dispatch(
        updateEntitlements({ 
          planCode: selectedPlan.code, 
          entitlements: localState 
        })
      ).unwrap();
      setMessage({ text: "Entitlements updated successfully ✅", type: "success" });
      setTimeout(() => {
        setModalOpen(false);
        setMessage({ text: "", type: "" });
      }, 1500);
    } catch (err) {
      setMessage({ text: err || "Failed to update entitlements ❌", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlanLocal(null);
    setLocalState([]);
    setMessage({ text: "", type: "" });
    setConfirmDelete(null);
  };

  // Filter plans based on search
  const filteredPlans = plans.filter(
    (plan) =>
      plan.plan_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.plan_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Plans Management</h1>
              <p className="text-gray-600 mt-1">Manage subscription plans and entitlements</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Plans Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {plansLoading ? (
            <div className="flex items-center justify-center py-16">
              <svg
                className="h-10 w-10 animate-spin text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          ) :filteredPlans.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No plans found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search" : "Get started by adding a plan"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan Code
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPlans.map((plan, idx) => (
                    <tr key={plan.plan_code} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{plan.plan_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {plan.plan_code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleEdit(plan.plan_code, plan.plan_name)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          {loadingPlanCode === plan.plan_code ? (
                            <svg
                              className="h-4 w-4 mr-1 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {modalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Entitlements
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedPlan.name} ({selectedPlan.code})
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Message Alert */}
              {message.text && (
                <div
                  className={`mx-6 mt-4 px-4 py-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : message.type === "error"
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === "success" && (
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {message.type === "error" && (
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                </div>
              )}

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {entitlementsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : localState.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No entitlements</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding a feature</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {localState.map((item, idx) => {
                      const value = item.feature_value;
                      const isBoolean = value === "true" || value === "false";
                      const isNumber = !isBoolean && !isNaN(Number(value)) && value !== "";

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Feature name (e.g., max_users)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              value={item.feature_name}
                              onChange={(e) =>
                                updateFeatureName(item.feature_name, e.target.value)
                              }
                            />
                          </div>

                          <div className="flex-1">
                            {isBoolean ? (
                              <label className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={value === "true"}
                                  onChange={(e) =>
                                    updateFeatureValue(
                                      item.feature_name,
                                      e.target.checked ? "true" : "false"
                                    )
                                  }
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">
                                  {value === "true" ? "Enabled" : "Disabled"}
                                </span>
                              </label>
                            ) : isNumber ? (
                              <input
                                type="number"
                                placeholder="Value"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={value}
                                onChange={(e) =>
                                  updateFeatureValue(item.feature_name, e.target.value)
                                }
                              />
                            ) : (
                              <input
                                type="text"
                                placeholder="Value"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={value}
                                onChange={(e) =>
                                  updateFeatureValue(item.feature_name, e.target.value)
                                }
                              />
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteFeature(item.feature_name)}
                            className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete feature"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={addFeature}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Feature
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                Delete Feature
              </h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Are you sure you want to delete "<strong>{confirmDelete}</strong>"? This action cannot be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFeature}
                  className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansCrudTable;