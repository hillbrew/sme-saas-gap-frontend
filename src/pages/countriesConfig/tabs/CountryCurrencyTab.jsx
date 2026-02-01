import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountryCurrencies,
  updateCountryCurrency,
} from "../../../redux/thunk/countryCurrencyThunk";
import { clearCountryCurrency } from "../../../redux/slices/countryCurrencySlice";

const CountryCurrencyTab = ({ countryId }) => {
  const dispatch = useDispatch();
  const { data, fetchLoading, updateLoading } = useSelector(
    (state) => state.countryCurrency
  );

  useEffect(() => {
    dispatch(fetchCountryCurrencies(countryId));

    return () => {
      dispatch(clearCountryCurrency());
    };
  }, [countryId, dispatch]);

  if (fetchLoading) {
    return <p className="text-sm text-gray-500">Loading currencies…</p>;
  }
  

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No currencies found</p>;
  }

  return (
    <div className="space-y-4">
        {updateLoading && (
           <p className="text-sm text-green-700 font-bold">Updating…</p>
        )}
      {data.map((currency) => (
        <CurrencyCard
          key={currency.id}
          currency={currency}
          loading={updateLoading}
          onSave={(payload) =>
            dispatch(
              updateCountryCurrency({
                id: currency.id,
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
/* Currency Card         */
/* ===================== */

const CurrencyCard = ({ currency, onSave, loading }) => {
  const [editing, setEditing] = useState(false);

  // ✅ Normalize API data → form-safe primitives
  const [form, setForm] = useState({
    currency_name: currency.currency_name || "",
    currency_symbol: currency.currency_symbol || "",
    decimal_places: currency.decimal_places ?? "",
    rounding: currency.rounding_rules?.rounding || "",
    exchange_rate_source: currency.exchange_rate_source || "",
    allowed_foreign_currencies: (
      currency.allowed_foreign_currencies || []
    ).join(", "),
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave({
      currency_name: form.currency_name,
      currency_symbol: form.currency_symbol,
      decimal_places: Number(form.decimal_places),
      rounding_rules: {
        rounding: form.rounding,
      },
      exchange_rate_source: form.exchange_rate_source,
      allowed_foreign_currencies: form.allowed_foreign_currencies
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    });
    setEditing(false);
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {currency.currency_code}
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
            label="Currency Name"
            value={form.currency_name}
            onChange={(v) => updateField("currency_name", v)}
          />

          <Input
            label="Symbol"
            value={form.currency_symbol}
            onChange={(v) => updateField("currency_symbol", v)}
          />

          <Input
            label="Decimal Places"
            type="number"
            value={form.decimal_places}
            onChange={(v) => updateField("decimal_places", v)}
          />

          <Input
            label="Rounding Rule"
            value={form.rounding}
            onChange={(v) => updateField("rounding", v)}
            placeholder="HALF_UP"
          />

          <Input
            label="Exchange Rate Source"
            value={form.exchange_rate_source}
            onChange={(v) => updateField("exchange_rate_source", v)}
          />

          <Input
            label="Allowed Foreign Currencies"
            value={form.allowed_foreign_currencies}
            onChange={(v) =>
              updateField("allowed_foreign_currencies", v)
            }
            placeholder="USD, EUR, GBP"
          />

          <div className="col-span-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="text-sm font-medium text-indigo-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <Info label="Name" value={currency.currency_name} />
          <Info label="Symbol" value={currency.currency_symbol} />
          <Info label="Decimals" value={currency.decimal_places} />
          <Info
            label="Rounding"
            value={currency.rounding_rules?.rounding}
          />
          <Info label="Rate Source" value={currency.exchange_rate_source} />
          <Info
            label="Allowed FX"
            value={(currency.allowed_foreign_currencies || []).join(", ")}
          />
        </div>
      )}
    </div>
  );
};

/* ===================== */
/* UI Helpers            */
/* ===================== */

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
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

export default CountryCurrencyTab;
