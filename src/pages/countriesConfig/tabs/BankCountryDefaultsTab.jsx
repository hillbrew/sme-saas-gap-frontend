import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBankCountryDefaults,
  updateBankCountryDefault,
} from "../../../redux/thunk/bankCountryDefaultsThunk";
import { clearBankCountryDefaults } from "../../../redux/slices/bankCountryDefaultsSlice";

const BankCountryDefaultsTab = ({ countryId }) => {
  const dispatch = useDispatch();
  const { data, loading, updating,error } = useSelector(
    (state) => state.bankCountryDefaults
  );

  useEffect(() => {
    dispatch(clearBankCountryDefaults());
    dispatch(fetchBankCountryDefaults(countryId));
  }, [countryId, dispatch]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading bank defaults…</p>;
  }

    if (error) {
    return (
      <div className="m-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No bank defaults found</p>;
  }

  // ✅ One record per country
  const record = data[0];

  return (
    <div className="space-y-6">
        {updating && (
           <p className="text-sm text-green-700 font-bold">Updating…</p>
        )}
      <EditableField
        label="IBAN Regex"
        value={record.iban_regex}
        onSave={(val) =>
          dispatch(
            updateBankCountryDefault({
              id: record.id,
              data: { iban_regex: val },
            })
          )
        }
        loading={loading}
      />

      <EditableField
        label="SWIFT Format"
        value={record.swift_format}
        onSave={(val) =>
          dispatch(
            updateBankCountryDefault({
              id: record.id,
              data: { swift_format: val },
            })
          )
        }
        loading={loading}
      />

      <EditableArrayField
        label="Bank List"
        values={record.bank_list || []}
        onSave={(val) =>
          dispatch(
            updateBankCountryDefault({
              id: record.id,
              data: { bank_list: val },
            })
          )
        }
        loading={loading}
      />

      <EditableField
        label="Local Payment Formats"
        value={record.local_payment_formats}
        onSave={(val) =>
          dispatch(
            updateBankCountryDefault({
              id: record.id,
              data: { local_payment_formats: val },
            })
          )
        }
        loading={loading}
      />
    </div>
  );
};

/* ===================== */
/* Reusable Components   */
/* ===================== */

const EditableField = ({ label, value, onSave, loading }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>

      {editing ? (
        <>
          <input
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <ActionButtons
            onSave={() => {
              onSave(val);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
            loading={loading}
          />
        </>
      ) : (
        <ViewRow
          value={value}
          onEdit={() => setEditing(true)}
        />
      )}
    </div>
  );
};

const EditableArrayField = ({ label, values, onSave, loading }) => {
  const [editing, setEditing] = useState(false);
  const [list, setList] = useState(values.join("\n"));

  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>

      {editing ? (
        <>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={list}
            onChange={(e) => setList(e.target.value)}
            placeholder="One item per line"
          />
          <ActionButtons
            onSave={() => {
              const parsed = list
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean);
              onSave(parsed);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
            loading={loading}
          />
        </>
      ) : (
        <div className="mt-1 flex items-start justify-between gap-4">
          <ul className="list-disc pl-5 text-sm text-gray-900">
            {values.length === 0 ? <li>—</li> : values.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <EditButton onClick={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
};

/* ===================== */
/* Small UI helpers      */
/* ===================== */

const ViewRow = ({ value, onEdit }) => (
  <div className="mt-1 flex items-center justify-between">
    <span className="text-sm text-gray-900">{value || "—"}</span>
    <EditButton onClick={onEdit} />
  </div>
);

const EditButton = ({ onClick }) => (
  <button onClick={onClick} className="text-sm text-indigo-600">
    Edit
  </button>
);

const ActionButtons = ({ onSave, onCancel, loading }) => (
  <div className="mt-2 flex gap-3">
    <button
      onClick={onSave}
      disabled={loading}
      className="text-sm font-medium text-indigo-600 disabled:opacity-50"
    >
      Save
    </button>
    <button
      onClick={onCancel}
      className="text-sm text-gray-500"
    >
      Cancel
    </button>
  </div>
);

export default BankCountryDefaultsTab;
