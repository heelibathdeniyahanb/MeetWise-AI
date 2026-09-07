import {
  CalendarDays,
  CheckSquare,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Meetings",
      value: "12",
      description: "This month",
      icon: CalendarDays,
    },
    {
      title: "Pending Tasks",
      value: "24",
      description: "Need attention",
      icon: CheckSquare,
    },
    {
      title: "Team Members",
      value: "8",
      description: "Across 2 teams",
      icon: Users,
    },
    {
      title: "Meeting Hours",
      value: "18.5",
      description: "This month",
      icon: Clock,
    },
  ];

  const recentMeetings = [
    {
      title: "Sprint Planning",
      date: "Today, 10:00 AM",
      duration: "45 min",
      status: "Analyzed",
    },
    {
      title: "Product Review",
      date: "Yesterday, 2:30 PM",
      duration: "52 min",
      status: "Analyzed",
    },
    {
      title: "Team Standup",
      date: "Sep 5, 9:00 AM",
      duration: "18 min",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, {user?.fullName?.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening with your meetings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-400">
                {stat.title}
              </p>

              <p className="mt-1 text-3xl font-bold">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Meetings */}
      <div className="rounded-xl border border-slate-800 bg-slate-900">

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="font-semibold">
              Recent Meetings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest meetings and AI analysis
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300">
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="divide-y divide-slate-800">
          {recentMeetings.map((meeting) => (
            <div
              key={meeting.title}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-800/40"
            >
              <div>
                <h3 className="font-medium">
                  {meeting.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {meeting.date} · {meeting.duration}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  meeting.status === "Analyzed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {meeting.status}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;