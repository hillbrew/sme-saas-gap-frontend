import { Eye, Loader2, Power, RotateCcw } from "lucide-react";
import { useState } from "react";
import CompanyDetailsPopup from "./CompanyDetailsPopup";

const CompanyActionsMenu = ({
  company,
  onDeactivate,
  onActivate,
  actionLoading,
  lastActionCompanyId,
  onClose,
}) => {
  const isProcessing =
    actionLoading && lastActionCompanyId === company.id;
    const [showDetails, setShowDetails] = useState(false);


  return (
    <div
      className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowDetails(true)}
        className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50"
      >
        <Eye className="w-4 h-4 mr-2 text-blue-600" />
        View Company Details
      </button>
      {showDetails && (
        <CompanyDetailsPopup
            company={company}
            onClose={() => setShowDetails(false)}
        />
        )}

      {company.is_active && (
        <button
          disabled={isProcessing}
          onClick={() => onDeactivate(company.id)}
          className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Power className="w-4 h-4 mr-2 text-red-600" />
          )}
          Deactivate Company
        </button>
      )}

      {!company.is_active && (
        <button
          disabled={isProcessing}
          onClick={() => onActivate(company.id)}
          className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RotateCcw className="w-4 h-4 mr-2 text-green-600" />
          )}
          Activate Company
        </button>
      )}

      <button
        onClick={onClose}
        className="w-full px-4 py-2 text-xs text-gray-500 text-left hover:bg-gray-50 border-t"
      >
        Close
      </button>
    </div>
  );
};

export default CompanyActionsMenu;
