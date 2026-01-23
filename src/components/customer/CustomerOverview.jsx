import {
  Mail,
  Calendar,
  Building2,
  UserCheck
} from "lucide-react";

const CustomerOverview = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="bg-white rounded-xl border p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Customer Info */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Customer Info
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{customer.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              Joined{" "}
              {new Date(customer.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserCheck  className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">Joined as:</span>{" "}
            <span className="font-medium">
              {customer.role}
            </span>
          </div>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              customer.is_verified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.is_verified ? "Verified" : "Unverified"}
          </span>
        </div>
      </div>

      {/* Active Company */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Active Company
        </h2>

        {customer.company_name ? (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="font-medium">
                {customer.company_name}
              </span>
            </div>

            <div>
              <span className="text-gray-500">Company Role:</span>{" "}
              <span className="font-medium">
                {customer.activeRole}
              </span>
            </div>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                customer.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {customer.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No active company
          </p>
        )}
      </div>

      {/* Admin Metadata */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Admin Details
        </h2>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Customer ID:</span>
            <div className="font-mono text-xs break-all">
              {customer.id}
            </div>
          </div>

          {customer.invitedBy && (
            <div>
              <span className="text-gray-500">Invited By</span>
              <div className="font-mono text-xs break-all">
                {customer.invitedBy}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
