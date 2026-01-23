import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div />

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-2 rounded-lg"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>

          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              John Doe
            </div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>

          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">
                John Doe
              </div>
              <div className="text-xs text-gray-500">
                john.doe@company.com
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                setShowProfileMenu(false);
                onNavigate("/admin/login");
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
