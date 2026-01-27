import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlanCard from "../../components/superadmin/PlanCard";
import axios from "../../lib/axios"; // your axios instance

const CompanySubscriptionPage = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [plans, setPlans] = useState([]);
  const [billing, setBilling] = useState("month");
  const [currentPlanCode, setCurrentPlanCode] = useState(null);
  const [currentPlanInterval, setCurrentPlanInterval] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId) return;

    setLoading(true);

    axios
      .get("/api/subscribers/plans", {
        params: {
          companyId,
          interval: billing,
        },
      })
      .then((res) => {
        setPlans(res.data.plans || []);

        if (res.data.currentPlan) {
          setCurrentPlanCode(res.data.currentPlan.plan_code);
          setCurrentPlanInterval(res.data.currentPlan.interval);
        }
      })
      .finally(() => setLoading(false));
  }, [companyId, billing]);

  if (!companyId) {
    return <p className="p-6 text-red-500">Company ID missing</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">
        Manage Company Subscription
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading plans…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.plan_id}
              plan={plan}
              billing={billing}
              companyId={companyId}
              currentPlanCode={currentPlanCode}
              currentPlanInterval={currentPlanInterval}
              userRole="SUPERADMIN"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanySubscriptionPage;
