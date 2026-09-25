import {
  Plus,
  Search,
  CalendarDays,
  Clock,
  Users,
  MoreHorizontal,
} from "lucide-react";
  
import { useNavigate } from "react-router-dom";

const Meetings = () => {
  const meetings = [
    {
      id: 1,
      title: "Sprint Planning",
      date: "Sep 24, 2026",
      time: "10:00 AM",
      duration: "45 min",
      participants: 6,
      status: "Analyzed",
    },
    {
      id: 2,
      title: "Product Review",
      date: "Sep 23, 2026",
      time: "2:30 PM",
      duration: "52 min",
      participants: 8,
      status: "Analyzed",
    },
    {
      id: 3,
      title: "Team Standup",
      date: "Sep 23, 2026",
      time: "9:00 AM",
      duration: "18 min",
      participants: 5,
      status: "Pending",
    },
    {
      id: 4,
      title: "Client Discussion",
      date: "Sep 22, 2026",
      time: "11:00 AM",
      duration: "1 hr",
      participants: 4,
      status: "Processing",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Meetings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your meetings and AI-generated insights.
          </p>
        </div>

        <button 
        onClick={() => navigate("/meetings/create")}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500">
          <Plus size={18} />
          New Meeting
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search meetings..."
            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
          />
        </div>

        <select className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500">
          <option>All meetings</option>
          <option>Analyzed</option>
          <option>Processing</option>
          <option>Pending</option>
        </select>

      </div>

      {/* Meeting list */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <div className="hidden border-b border-slate-800 px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 md:grid md:grid-cols-12">
          <div className="col-span-4">Meeting</div>
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-2">Participants</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-slate-800">

          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => navigate(`/meetings/${meeting.id}`)}
              className="grid gap-4 px-6 py-5 transition hover:bg-slate-800/40 md:grid-cols-12 md:items-center"
            >

              {/* Meeting */}
              <div className="md:col-span-4">
                <h3 className="font-medium text-white">
                  {meeting.title}
                </h3>

                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {meeting.duration}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays size={16} className="text-slate-500" />
                  {meeting.date}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {meeting.time}
                </p>
              </div>

              {/* Participants */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users size={16} className="text-slate-500" />
                  {meeting.participants}
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    meeting.status === "Analyzed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : meeting.status === "Processing"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {meeting.status}
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-1 md:text-right">
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Meetings;