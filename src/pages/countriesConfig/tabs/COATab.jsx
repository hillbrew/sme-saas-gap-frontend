import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoaTemplates,
  createCoaTemplate,
  updateCoaTemplate,
  deleteCoaTemplate,
} from "../../../redux/thunk/coaThunk";
import { clearCoaState } from "../../../redux/slices/coaSlice";

const COATab = ({ countryIsoCode }) => {
  const dispatch = useDispatch();
  const { data, fetchLoading, actionLoading } = useSelector(
    (state) => state.coa
  );

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCoaTemplates(countryIsoCode));
    return () => dispatch(clearCoaState());
  }, [countryIsoCode, dispatch]);

  if (fetchLoading) {
    return <p className="text-sm text-gray-500">Loading COA templates…</p>;
  }

  return (
    <div className="space-y-6">
      {actionLoading && (
        <p className="text-sm text-gray-500">Updating…</p>
      )}

      {/* CREATE */}
      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm font-medium mb-2">Create COA Template</p>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Name"
            value={newTemplate.name}
            onChange={(v) =>
              setNewTemplate((p) => ({ ...p, name: v }))
            }
          />
          <Input
            label="Description"
            value={newTemplate.description}
            onChange={(v) =>
              setNewTemplate((p) => ({ ...p, description: v }))
            }
          />
        </div>

        <button
          disabled={actionLoading}
          onClick={() => {
            dispatch(
              createCoaTemplate({
                country_iso_code: countryIsoCode,
                ...newTemplate,
              })
            );
            setNewTemplate({ name: "", description: "" });
          }}
          className="mt-3 text-sm text-indigo-600"
        >
          Create
        </button>
      </div>

      {/* LIST */}
      {data.map((tpl) => (
        <CoaCard
          key={tpl.id}
          template={tpl}
          loading={actionLoading}
          onUpdate={(payload) =>
            dispatch(updateCoaTemplate({ id: tpl.id, data: payload }))
          }
          onDelete={() => dispatch(deleteCoaTemplate(tpl.id))}
        />
      ))}
    </div>
  );
};

/* ===================== */
/* COA Card              */
/* ===================== */

const CoaCard = ({ template, onUpdate, onDelete, loading }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: template.name,
    description: template.description || "",
  });

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex justify-between mb-2">
        <h4 className="font-medium">{template.name}</h4>
        <div className="flex gap-3 text-sm">
          <button onClick={() => setEditing(!editing)} className="text-indigo-600">
            {editing ? "Cancel" : "Edit"}
          </button>
          <button onClick={onDelete} className="text-red-600">
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <>
          <Input
            label="Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(v) =>
              setForm((p) => ({ ...p, description: v }))
            }
          />

          <button
            disabled={loading}
            onClick={() => {
              onUpdate(form);
              setEditing(false);
            }}
            className="mt-3 text-sm text-indigo-600"
          >
            Save
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          {template.description || "—"}
        </p>
      )}
    </div>
  );
};

/* ===================== */
/* Helpers               */
/* ===================== */

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

export default COATab;
