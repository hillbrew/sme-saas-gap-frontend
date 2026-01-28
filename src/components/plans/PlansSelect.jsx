import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPlan,
  selectPlans,
  selectSelectedPlan,
} from "../../redux/slices/PlansSlice";
import { fetchPlansManager } from "../../redux/thunk/PlansThunk";

const PlansSelect = () => {
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);
  const selectedPlan = useSelector(selectSelectedPlan);

  useEffect(() => {
    dispatch(fetchPlansManager());
  }, [dispatch]);

  return (
    <div className="space-y-2">
      <label className="font-medium">Select Plan</label>

      <select
        className="w-full border rounded px-3 py-2"
        value={selectedPlan || ""}
        onChange={(e) =>
          dispatch(setSelectedPlan(e.target.value))
        }
      >
        <option value="">-- Select Plan --</option>
        {plans.map((plan) => (
          <option
            key={plan.plan_code}
            value={plan.plan_code}
          >
            {plan.plan_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlansSelect;
