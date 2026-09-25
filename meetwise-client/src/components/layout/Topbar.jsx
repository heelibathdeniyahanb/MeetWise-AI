import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      {/* Left */}
      <div>
        <p className="text-sm text-slate-400">
          AI Meeting Management
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-white">
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              {user?.fullName}
            </p>

            <p className="text-xs text-slate-500">
              {user?.roles?.[0] || "Member"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;