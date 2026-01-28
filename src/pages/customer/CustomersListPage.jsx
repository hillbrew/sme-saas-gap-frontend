import { Search, Filter, Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCustomers } from "../../redux/thunk/thunk";

export function CustomersListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Always array
  const customers = useSelector((state) => state.customers.customers || []);
  const loading = useSelector((state) => state.customers.customersLoading);
  const error = useSelector((state) => state.customers.customersError);
  console.log("customers", customers);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // useEffect(() => {
  //   dispatch(fetchCustomers());
  // }, [dispatch]);

  // ✅ Filter using real API fields
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.role?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && customer.is_verified) ||
      (statusFilter === "unverified" && !customer.is_verified);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Customers
        </h1>
        <p className="text-gray-600">
          Manage all customer accounts and subscriptions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>

            <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">
          Loading customers...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12 text-red-500">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="w-full">
                <thead className=" sticky top-0 bg-gray-50 z-10">
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium">
                      Email
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium">
                      Role
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 font-medium">
                          {customer.email}
                        </td>

                        {/* <td className="px-6 py-4">
                          {customer.role}
                        </td> */}

                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              customer.is_verified
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {customer.is_verified ? "Verified" : "Unverified"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              navigate(`/admin/customer-detail/${customer.id}`)
                            }
                            className="inline-flex items-center text-blue-600"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
