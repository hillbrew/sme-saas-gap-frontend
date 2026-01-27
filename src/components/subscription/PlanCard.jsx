import { useState } from "react";
import axios from "../../lib/axios";

const PLAN_ORDER = ["FREE", "ESSENTIAL", "GROWTH", "PROFESSIONAL"];

const PlanCard = ({
  plan,
  billing,
  companyId,
  currentPlanCode,
  currentPlanInterval,
  userRole,
}) => {
  const { plan_code, plan_name, pricing } = plan;

  const normalizedBilling = billing === "year" ? "year" : "month";

  const currentIndex = PLAN_ORDER.indexOf(currentPlanCode);
  const targetIndex = PLAN_ORDER.indexOf(plan_code);

  const isCurrentPlan =
    plan_code === currentPlanCode &&
    currentPlanInterval === normalizedBilling;

  const isDowngrade = targetIndex < currentIndex;

  const isSuperAdmin = userRole === "SUPERADMIN";

  // 🔒 superadmin rules
  const disableForSuperAdmin =
    isSuperAdmin && (!isDowngrade || isCurrentPlan);

  const [loading, setLoading] = useState(false);

  const handleDowngrade = async () => {
    if (disableForSuperAdmin) return;

    setLoading(true);
    try {
      await axios.post("/api/subscribers/change-plan", {
        companyId,
        newPlanCode: plan_code,
        interval: billing,
      });

      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h3 className="text-lg font-semibold">{plan_name}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {pricing?.price} {pricing?.currency} / {billing}
      </p>

      <button
        onClick={handleDowngrade}
        disabled={disableForSuperAdmin || loading}
        className={`mt-6 w-full py-2 rounded-lg font-medium
          ${
            disableForSuperAdmin
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }
        `}
      >
        {isCurrentPlan
          ? "Current Plan"
          : isDowngrade
          ? loading
            ? "Processing…"
            : "Downgrade"
          : "Upgrade Disabled"}
      </button>
    </div>
  );
};

export default PlanCard;
