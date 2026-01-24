import { X } from "lucide-react";

const ConfirmActionModal = ({ 
  title = "Confirm Action",
  message = "Are you sure?",
  confirmLabel = "Yes",
  cancelLabel = "No",
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onCancel}>
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded text-white flex items-center justify-center disabled:opacity-50 ${
              confirmLabel.toLowerCase().includes("deactivate") || confirmLabel.toLowerCase().includes("delete")
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
