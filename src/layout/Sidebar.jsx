import {
  Building2,
  Users,
  Package,
  Globe,
  Shield,
  BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/admin/customer-list", label: "Customers", icon: Users },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/countries", label: "Countries & Tax", icon: Globe },
  { path: "/admin/roles", label: "Roles & Admins", icon: Shield },
  { path: "/admin/plans-manager", label: "Plans Management", icon: Shield },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Building2 className="w-8 h-8 text-blue-600" />
          <span className="ml-3 font-semibold text-gray-900">
            AccountSaaS
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
