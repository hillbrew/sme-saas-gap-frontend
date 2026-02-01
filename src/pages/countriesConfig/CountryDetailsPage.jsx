import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BankCountryDefaultsTab from "./tabs/BankCountryDefaultsTab";
import CountryKnowledgeTab from "./tabs/CountryKnowledgeTab";
import CountryCurrencyTab from "./tabs/CountryCurrencyTab";
import COATab from "./tabs/COATab";
import { useSelector } from "react-redux";
import ComplianceCalendarTab from "./tabs/ComplianceCalendarTab";
import TaxRegimesTab from "./tabs/TaxRegimesTab";
// import BankCountryDefaultsTab from "./tabs/BankCountryDefaultsTab";

const TABS = [
  { key: "bank", label: "Bank Defaults" },
  { key: "tax", label: "Tax Regimes" },
  { key: "coa", label: "Chart of Accounts" },
  { key: "compliance", label: "Compliance" },
  { key:"knowledge", label:"Country Knowledge"},
  { key: "currency", label: "Currencies" }
];

const CountryDetailsPage = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bank");

  const country = useSelector((state) =>
    state.countries.countries.find((c) => c.id === countryId)
  );
  console.log("country",country)

  if (!country) {
    return <p className="p-6 text-sm text-gray-500">Country not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600 hover:underline"
      >
        ← Back to Countries
      </button>

      {/* Header */}
      <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Country Configuration
        </h2>
        <p className="text-sm text-gray-500">
          Manage configurations for selected country
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200 flex gap-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab.key
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        {activeTab === "bank" && (
          <BankCountryDefaultsTab countryId={countryId} />
        )}
        {activeTab === "knowledge" && (
          <CountryKnowledgeTab countryId={countryId} />
        )}
        {activeTab === "currency" && (
          <CountryCurrencyTab countryId={countryId} />
        )}
        {activeTab === "coa" && (
          <COATab countryIsoCode={country.iso_code} />
        )}
        {activeTab === "compliance" && (
          <ComplianceCalendarTab countryId={countryId} />
        )}
        {activeTab === "tax" && (
          <TaxRegimesTab countryId={countryId} />
        )}
        
        {activeTab !== "bank" && (
          <p className="text-sm text-gray-500">
            {/* Coming soon… */}
          </p>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
