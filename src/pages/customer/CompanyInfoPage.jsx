import {
  ArrowLeft,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanyInfoPage = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const location = useLocation();

  const companies = useSelector(
    (state) => state.customers.companies
  );

  const company =
    location.state?.company ||
    companies.find((c) => c.id === companyId);

  if (!company) {
    return (
      <div className="p-6 text-gray-500">
        Company not found
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-gray-500" />
          <div>
            <h1 className="text-xl font-semibold">
              {company.name}
            </h1>
            <p className="text-sm text-gray-500">
              Company ID: {company.id}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            company.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {company.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Overview */}
      <Section title="Overview">
        <Grid>
          <Field label="Country" value={company.country} />
          <Field label="Base Currency" value={company.base_currency} />
          <Field label="Users Count" value={company.users_count} />
          <Field
            label="Created At"
            value={new Date(company.created_at).toLocaleDateString()}
          />
        </Grid>
      </Section>

      {/* Membership */}
      <Section title="Role">
        <Grid>
          <Field label="Role" value={company.role} />
        </Grid>
      </Section>

      {/* Onboarding */}
      <Section title="Onboarding Status">
        <Grid>
          <Field
            label="Stage"
            value={company.onboarding_stage}
          />
          <StatusField
            label="Completed"
            value={company.onboarding_completed}
          />
        </Grid>
      </Section>

      {/* Accounting Settings */}
      <Section title="Accounting Settings">
        <Grid>
          <Field
            label="Timezone"
            value={company.settings?.timezone}
          />
          <Field
            label="Date Format"
            value={company.settings?.date_format}
          />
          <Field
            label="Number Format"
            value={company.settings?.number_format}
          />
          <Field
            label="FY Start Month"
            value={company.settings?.financial_year_start_month}
          />
          <Field
            label="FY End Month"
            value={company.settings?.fiscal_year_end_month}
          />
          <Field
            label="COA Template"
            value={company.settings?.coa_template_code}
          />
        </Grid>
      </Section>

      {/* Tax */}
      <Section title="Tax Information">
        <Grid>
          <Field label="Tax ID" value={company.tax_id} />
          <Field
            label="Tax Regime"
            value={company.tax_regime?.regime_name}
          />
          <Field
            label="Regime Code"
            value={company.tax_regime?.regime_code}
          />
          <Field
            label="Description"
            value={company.tax_regime?.description}
          />
        </Grid>
      </Section>
    </div>
  );
};

export default CompanyInfoPage;

/* ---------------- UI Helpers ---------------- */

const Section = ({ title, children }) => (
  <div className="bg-white border rounded-xl p-6">
    <h2 className="text-sm font-semibold text-gray-700 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
    {children}
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">
      {value ?? "—"}
    </p>
  </div>
);

const StatusField = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <div className="flex items-center gap-1 font-medium">
      {value ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          Yes
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 text-red-600" />
          No
        </>
      )}
    </div>
  </div>
);
