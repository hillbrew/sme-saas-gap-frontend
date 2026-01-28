import { Eye, Loader2, Power, RotateCcw } from "lucide-react";
import { useState } from "react";
import CompanyDetailsPopup from "./CompanyDetailsPopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

const CompanyActionsMenu = ({
  company,
  onDeactivate,
  onActivate,
  actionLoading,
  lastActionCompanyId,
  onClose,
  onDelete,
  onViewDetails, // callback to open details in parent
}) => {
  const isProcessing = actionLoading && lastActionCompanyId === company.id;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow z-50">
      <button
        onClick={() => {
          onViewDetails(company);
          onClose();
        }}
        className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50"
      >
        <Eye className="w-4 h-4 mr-2 text-blue-600" />
        View Company Details
      </button>

      {company.is_active ? (
        <button
          disabled={isProcessing}
          onClick={() => onDeactivate(company.id)}
          className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Power className="w-4 h-4 mr-2 text-red-600" />
          )}
          Deactivate Company
        </button>
      ) : (
        <button
          disabled={isProcessing}
          onClick={() => onActivate(company.id)}
          className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
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
        onClick={() => setShowDeleteConfirm(true)}
        className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50"
      >
        Delete Company
      </button>

      <button
        onClick={onClose}
        className="w-full px-4 py-2 text-xs text-gray-500 text-left hover:bg-gray-50 border-t"
      >
        Close
      </button>

      {showDeleteConfirm && (
        <ConfirmDeletePopup
          title="Delete Company"
          message={`Are you sure you want to delete "${company.name}"? This action cannot be undone.`}
          loading={isProcessing}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            onDelete(company.id);
            setShowDeleteConfirm(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default CompanyActionsMenu;
