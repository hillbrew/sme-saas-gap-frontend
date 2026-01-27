import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanySubscription } from "../../redux/thunk/subscriptionThunk";
import { CreditCard, Calendar, ShieldCheck } from "lucide-react";
import ManagePlansModal from "./ManagePlansModal";

const CustomerSubscriptionPanel = ({ companyId }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.subscription
  );
  const [showManagePlans, setShowManagePlans] = useState(false);


  console.log("data",data)

  useEffect(() => {
    if (companyId) {
      // companyId === customerId (as per your requirement)
      dispatch(fetchCompanySubscription(companyId));
    }
  }, [companyId, dispatch]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading subscription details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-gray-500">
        No subscription data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  

      {/* Plan Info */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Plan Details</h3>
        </div>
         

        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-500">Plan:</span>{" "}
            <span className="font-medium">{data.plan_name}</span>
          </p>

          <p>
            <span className="text-gray-500">Plan Code:</span>{" "}
            <span className="font-medium">{data.plan_code}</span>
          </p>

          <p>
            <span className="text-gray-500">Status:</span>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                data.status === "ACTIVE" || data.status === "FREE"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {data.status}
            </span>
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-lg">Billing Period</h3>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-500">Current Period Start:</span>{" "}
            {data.current_period_start
              ? new Date(data.current_period_start).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <span className="text-gray-500">Current Period End:</span>{" "}
            {data.current_period_end
              ? new Date(data.current_period_end).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Security / Info */}
      <div className="border rounded-xl p-6 bg-white md:col-span-2">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-lg">Subscription Notes</h3>
        </div>

        <p className="text-sm text-gray-600">
          This subscription is managed by the platform administrator.
          Any upgrades, downgrades, or cancellations will reflect here.
        </p>
      </div>
      <button
        onClick={() => setShowManagePlans(true)}
        className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Manage Plans
      </button>

      {showManagePlans && (
        <ManagePlansModal
          companyId={companyId}
          currentPlanCode={data.plan_code}
          currentPlanInterval={data.interval}
          onClose={() => setShowManagePlans(false)}
        />
      )}
    </div>
    
  );
};




export default CustomerSubscriptionPanel;
