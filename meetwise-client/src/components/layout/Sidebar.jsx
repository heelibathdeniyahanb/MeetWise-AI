import { NavLink } from "react-router-dom";
import { CalendarDays, LayoutDashboard } from "lucide-react";

const navigation = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Meetings", to: "/meetings", icon: CalendarDays },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 md:block">
      <div className="sticky top-0 flex h-screen flex-col p-5">
        <div className="mb-8 px-3">
          <p className="text-xl font-semibold tracking-tight text-white">MeetWise</p>
          <p className="mt-1 text-xs text-slate-500">AI meeting management</p>
        </div>

        <nav className="space-y-1" aria-label="Primary navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;