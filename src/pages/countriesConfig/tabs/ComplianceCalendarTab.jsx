import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplianceCalendars,
  updateComplianceCalendar,
} from "../../../redux/thunk/complianceCalendarThunk";
import { clearComplianceCalendar } from "../../../redux/slices/complianceCalendarSlice";

/* ===================== */
/* MAIN TAB              */
/* ===================== */

const ComplianceCalendarTab = ({ countryId }) => {
  const dispatch = useDispatch();
  const { data, fetchLoading, updateLoading } = useSelector(
    (state) => state.complianceCalendar
  );

  useEffect(() => {
    dispatch(fetchComplianceCalendars(countryId));
    return () => dispatch(clearComplianceCalendar());
  }, [countryId, dispatch]);

  if (fetchLoading) {
    return (
      <p className="text-sm text-gray-500">
        Loading compliance calendars…
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No compliance calendars found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {updateLoading && (
        <p className="text-sm text-gray-500">Updating…</p>
      )}

      {data.map((calendar) => (
        <ComplianceCard
          key={calendar.id}
          calendar={calendar}
          loading={updateLoading}
          onSave={(payload) =>
            dispatch(
              updateComplianceCalendar({
                id: calendar.id,
                data: payload,
              })
            )
          }
        />
      ))}
    </div>
  );
};

/* ===================== */
/* COMPLIANCE CARD       */
/* ===================== */

const ComplianceCard = ({ calendar, onSave, loading }) => {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: calendar.name || "",
    description: calendar.description || "",
    frequency: calendar.frequency || "",
    due_day: calendar.due_day ?? "",
    months: (calendar.months || []).join(", "),
    reminder_days: (calendar.reminder_days || []).join(", "),
    requires_attachments: Boolean(calendar.requires_attachments),
  });

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onSave({
      name: form.name,
      description: form.description,
      frequency: form.frequency,
      due_day: Number(form.due_day),

      // ✅ INT[] (Prisma-safe)
      months: form.months
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v)),

      reminder_days: form.reminder_days
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v)),

      requires_attachments: form.requires_attachments,
    });

    setEditing(false);
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {calendar.name}
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
          <Input label="Name" value={form.name} onChange={(v) => update("name", v)} />
          <Input label="Description" value={form.description} onChange={(v) => update("description", v)} />
          <Input label="Frequency" value={form.frequency} onChange={(v) => update("frequency", v)} />
          <Input label="Due Day" type="number" value={form.due_day} onChange={(v) => update("due_day", v)} />

          <Input
            label="Months (1–12)"
            value={form.months}
            onChange={(v) =>
              update("months", v.replace(/[^0-9, ]/g, ""))
            }
            placeholder="1, 2, 3"
          />

          <Input
            label="Reminder Days"
            value={form.reminder_days}
            onChange={(v) =>
              update("reminder_days", v.replace(/[^0-9, ]/g, ""))
            }
            placeholder="7, 3, 1"
          />

          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.requires_attachments}
              onChange={(e) =>
                update("requires_attachments", e.target.checked)
              }
            />
            Requires attachments
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
          <Info label="Frequency" value={calendar.frequency} />
          <Info label="Due Day" value={calendar.due_day} />
          <Info label="Months" value={(calendar.months || []).join(", ")} />
          <Info label="Reminders" value={(calendar.reminder_days || []).join(", ")} />
          <Info label="Attachments" value={calendar.requires_attachments ? "Yes" : "No"} />
        </div>
      )}
    </div>
  );
};

/* ===================== */
/* UI HELPERS            */
/* ===================== */

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
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

export default ComplianceCalendarTab;
