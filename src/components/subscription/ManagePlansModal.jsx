import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, changePlan } from "../../redux/thunk/subscriptionThunk";

const PLAN_ORDER = ["FREE", "ESSENTIAL", "GROWTH", "PROFESSIONAL"];

const ManagePlansModal = ({
  companyId,
  currentPlanCode,
  currentPlanInterval,
  onClose,
}) => {
  const dispatch = useDispatch();

  const {
    plans,
    plansLoading,
    downgradingPlanCode,
  } = useSelector((s) => s.subscription);

  useEffect(() => {
    if (!companyId) return;

    dispatch(
      fetchPlans({
        interval: currentPlanInterval,
        companyId,
      })
    );
  }, [dispatch, companyId, currentPlanInterval]);

  const currentIndex = PLAN_ORDER.indexOf(currentPlanCode);

  const handleDowngrade = async (planCode) => {
    try {
      await dispatch(
        changePlan({
          companyId,
          planCode,
          billing: currentPlanInterval,
        })
      ).unwrap();

      onClose();
    } catch (err) {
      console.error("Downgrade failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">
          Manage Subscription Plans
        </h2>

        {plansLoading ? (
          <p className="text-gray-500">Loading plans…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const targetIndex = PLAN_ORDER.indexOf(plan.plan_code);

              const isCurrent =
                plan.plan_code === currentPlanCode &&
                plan.pricing?.interval === currentPlanInterval;

              const isDowngrade = targetIndex < currentIndex;

              const isLoadingThisPlan =
                downgradingPlanCode === plan.plan_code;

              const disabled = !isDowngrade || isCurrent;

              return (
                <div
                  key={plan.plan_code}
                  className="border rounded-lg p-4"
                >
                  <h3 className="font-medium">{plan.plan_name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {plan.pricing?.price} {plan.pricing?.currency} /{" "}
                    {plan.pricing?.interval}
                  </p>

                  <button
                    disabled={disabled || isLoadingThisPlan}
                    onClick={() => handleDowngrade(plan.plan_code)}
                    className={`mt-4 w-full py-2 text-sm rounded-lg
                      ${
                        disabled
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                  >
                    {isCurrent
                      ? "Current Plan"
                      : isLoadingThisPlan
                      ? "Downgrading..."
                      : isDowngrade
                      ? "Downgrade"
                      : "Upgrade Disabled"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePlansModal;
