import { X, Building2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyDetailsPopup = ({ company, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-0 bg-white w-96 rounded-xl shadow z-50">
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-sm">{company.name}</h3>
        </div>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3 text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span
            className={`font-medium ${
              company.is_active ? "text-green-600" : "text-red-600"
            }`}
          >
            {company.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Country</span>
          <span>{company.country}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Currency</span>
          <span>{company.base_currency}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Users</span>
          <span>{company.users_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Onboarding</span>
          <span>{company.onboarding_stage}</span>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => {
          onClose();
          navigate(`/admin/company/${company.id}`, {
            state: { company },
          });
        }}
        className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50"
      >
        <Eye className="w-4 h-4 mr-2 text-blue-600" />
        View Company Details
      </button>

      {/* Footer */}
      <div className="border-t px-4 py-3 flex justify-end">
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompanyDetailsPopup;
