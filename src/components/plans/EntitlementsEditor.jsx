import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedPlan,
  selectEntitlementsByPlan,
  selectPlansLoading,
} from "../../redux/slices/PlansSlice";
import {
  fetchEntitlements,
  updateEntitlements,
} from "../../redux/thunk/PlansThunk";

const EntitlementsEditor = () => {
  const dispatch = useDispatch();
  const planCode = useSelector(selectSelectedPlan);
  const entitlements = useSelector(selectEntitlementsByPlan);
  const loading = useSelector(selectPlansLoading);

  const [localState, setLocalState] = useState([]);

  /* ---------------- Fetch entitlements ---------------- */
  useEffect(() => {
    if (planCode) {
      dispatch(fetchEntitlements(planCode));
    }
  }, [planCode, dispatch]);

  /* ---------------- Sync redux → local ---------------- */
  useEffect(() => {
    setLocalState(
      entitlements?.map((e) => ({ ...e })) || []
    );
  }, [entitlements]);

  /* ---------------- Update value ---------------- */
  const updateValue = (name, value) => {
    setLocalState((prev) =>
      prev.map((item) =>
        item.feature_name === name
          ? { ...item, feature_value: value }
          : item
      )
    );
  };

  /* ---------------- Save ---------------- */
  const handleSave = () => {
    dispatch(
      updateEntitlements({
        planCode,
        entitlements: localState,
      })
    );
  };

  if (!planCode) return null;

  return (
    <div className="border rounded-lg p-5 space-y-4 bg-white">
      <h2 className="text-lg font-medium">
        Entitlements — {planCode}
      </h2>

      {loading && <p className="text-sm">Loading…</p>}

      <div className="space-y-3">
        {localState.map((item) => {
          const value = item.feature_value;
          const isBoolean =
            value === "true" || value === "false";
          const isNumber =
            !isBoolean && !isNaN(Number(value));

          return (
            <div
              key={item.feature_name}
              className="flex items-center justify-between gap-6 border-b pb-3"
            >
              <span className="capitalize text-sm font-medium">
                {item.feature_name.replace(/_/g, " ")}
              </span>

              {/* Boolean */}
              {isBoolean && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value === "true"}
                    onChange={(e) =>
                      updateValue(
                        item.feature_name,
                        e.target.checked
                          ? "true"
                          : "false"
                      )
                    }
                    className="accent-black"
                  />
                  <span className="text-xs">
                    {value === "true"
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </label>
              )}

              {/* Number */}
              {isNumber && (
                <input
                  type="number"
                  min="0"
                  className="border rounded px-3 py-1 w-28"
                  value={value}
                  onChange={(e) =>
                    updateValue(
                      item.feature_name,
                      e.target.value
                    )
                  }
                />
              )}

              {/* Fallback text */}
              {!isBoolean && !isNumber && (
                <input
                  type="text"
                  className="border rounded px-3 py-1 w-48"
                  value={value}
                  onChange={(e) =>
                    updateValue(
                      item.feature_name,
                      e.target.value
                    )
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EntitlementsEditor;
