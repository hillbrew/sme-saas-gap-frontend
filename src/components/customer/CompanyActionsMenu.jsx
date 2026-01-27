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
}) => {
  const isProcessing =
    actionLoading && lastActionCompanyId === company.id;

  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    // OVERLAY
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="bg-white w-80 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowDetails(true)}
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

        {showDetails && (
          <CompanyDetailsPopup
            company={company}
            onClose={() => setShowDetails(false)}
          />
        )}

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
    </div>
  );
};

export default CompanyActionsMenu;
