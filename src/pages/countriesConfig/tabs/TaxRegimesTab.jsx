import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaxRegimes,
  updateTaxRegime,
} from "../../../redux/thunk/taxRegimesThunk";
import { clearTaxRegimes } from "../../../redux/slices/taxRegimesSlice";

const TaxRegimesTab = ({ countryId }) => {
  const dispatch = useDispatch();
  const { data, fetchLoading, updateLoading } = useSelector(
    (state) => state.taxRegimes
  );

  useEffect(() => {
    dispatch(fetchTaxRegimes(countryId));
    return () => dispatch(clearTaxRegimes());
  }, [countryId, dispatch]);

  if (fetchLoading) {
    return <p className="text-sm text-gray-500">Loading tax regimes…</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No tax regimes found</p>;
  }

  return (
    <div className="space-y-4">
      {updateLoading && (
        <p className="text-sm text-gray-500">Updating…</p>
      )}

      {data.map((regime) => (
        <TaxRegimeCard
          key={regime.id}
          regime={regime}
          loading={updateLoading}
          onSave={(payload) =>
            dispatch(
              updateTaxRegime({
                id: regime.id,
                data: payload,
              })
            )
          }
        />
      ))}
    </div>
  );
};


const TaxRegimeCard = ({ regime, onSave, loading }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    regime_code: regime.regime_code || "",
    regime_name: regime.regime_name || "",
    description: regime.description || "",
    is_default: Boolean(regime.is_default),
  });

  const update = (k, v) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    onSave(form);
    setEditing(false);
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {regime.regime_name}
          {regime.is_default && (
            <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
              Default
            </span>
          )}
        </h4>

        <button
          onClick={() => setEditing((v) => !v)}
          className="text-sm text-indigo-600"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {editing ? (
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Regime Code"
            value={form.regime_code}
            onChange={(v) => update("regime_code", v)}
          />

          <Input
            label="Regime Name"
            value={form.regime_name}
            onChange={(v) => update("regime_name", v)}
          />

          <Input
            label="Description"
            value={form.description}
            onChange={(v) => update("description", v)}
          />

          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) =>
                update("is_default", e.target.checked)
              }
            />
            Default tax regime
          </label>

          <div className="col-span-2">
            <button
              disabled={loading}
              onClick={handleSave}
              className="text-sm font-medium text-indigo-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <Info label="Code" value={regime.regime_code} />
          <Info label="Name" value={regime.regime_name} />
          <Info label="Description" value={regime.description} />
          <Info label="Default" value={regime.is_default ? "Yes" : "No"} />
        </div>
      )}
    </div>
  );
};


const Input = ({ label, value, onChange }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
    />
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm">{value || "—"}</p>
  </div>
);

export default TaxRegimesTab;
