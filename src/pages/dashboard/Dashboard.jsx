import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  Activity,
  Eye,
} from "lucide-react";

const kpis = [
  {
    id: 1,
    label: "Total Revenue",
    value: "$847,329",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    label: "Active Customers",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    label: "Companies",
    value: "3,892",
    change: "+15.3%",
    trend: "up",
    icon: Building2,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    label: "Churn Rate",
    value: "2.4%",
    change: "-0.8%",
    trend: "down",
    icon: Activity,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

const recentCustomers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    company: "TechCorp Solutions",
    status: "Active",
    mrr: "$2,499",
    joinDate: "Jan 15, 2026",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@innovate.io",
    company: "Innovate Digital",
    status: "Active",
    mrr: "$4,999",
    joinDate: "Jan 14, 2026",
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma.w@startup.co",
    company: "Startup Labs",
    status: "Trial",
    mrr: "$0",
    joinDate: "Jan 12, 2026",
  },
  {
    id: "4",
    name: "James Brown",
    email: "james@enterprise.com",
    company: "Enterprise Systems",
    status: "Active",
    mrr: "$9,999",
    joinDate: "Jan 10, 2026",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@growth.io",
    company: "Growth Partners",
    status: "Inactive",
    mrr: "$0",
    joinDate: "Dec 28, 2025",
  },
];

export default function Dashboard() {
  return (
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your business metrics and recent activity
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const TrendIcon =
              kpi.trend === "up" ? TrendingUp : TrendingDown;

            return (
              <div
                key={kpi.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>

                  <div
                    className={`flex items-center text-sm font-medium ${
                      kpi.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendIcon className="w-4 h-4 mr-1" />
                    {kpi.change}
                  </div>
                </div>

                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-gray-600">
                  {kpi.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Customers Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Recent Customers
            </h2>
            <button
              onClick={() => onNavigate("customers")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    MRR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {recentCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.company}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : customer.status === "Trial"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {customer.mrr}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.joinDate}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          onNavigate("customer-detail", customer.id)
                        }
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

