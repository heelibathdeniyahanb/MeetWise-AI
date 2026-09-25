import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  Clock,
 Clock3,
  Users,
   FileText,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
  
import { useNavigate } from "react-router-dom";
import meetingService from "../../services/meetingService";

const Meetings = () => {
 

  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await meetingService.getMeetings();

        if (response.success) {
          setMeetings(response.data || []);
        } else {
          setError(response.message || "Failed to load meetings.");
        }
      } catch (err) {
        console.error("Failed to load meetings:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load meetings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      const matchesSearch = meeting.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        meeting.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [meetings, searchTerm, statusFilter]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "analyzed":
        return "bg-emerald-500/10 text-emerald-400";

      case "processing":
        return "bg-blue-500/10 text-blue-400";

      case "pending":
        return "bg-yellow-500/10 text-yellow-400";

      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

   return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your meetings and AI-generated insights.
          </p>
        </div>

        <button
          onClick={() => navigate("/meetings/create")}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          New Meeting
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Analyzed">Analyzed</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 size={20} className="animate-spin" />
            Loading meetings...
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredMeetings.length === 0 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
          <FileText size={40} className="text-slate-600" />

          <h3 className="mt-4 text-lg font-medium text-white">
            No meetings found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create a meeting to get started.
          </p>

          <button
            onClick={() => navigate("/meetings/create")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Create Meeting
          </button>
        </div>
      )}

      {/* Meetings */}
      {!loading && !error && filteredMeetings.length > 0 && (
        <div className="space-y-3">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => navigate(`/meetings/${meeting.id}`)}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 hover:bg-slate-900/80"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                {/* Main information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate text-lg font-semibold text-white">
                      {meeting.title}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                        meeting.status
                      )}`}
                    >
                      {meeting.status}
                    </span>
                  </div>

                  {meeting.description && (
                    <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                      {meeting.description}
                    </p>
                  )}

                  {/* Meeting metadata */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(meeting.meetingDate)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {formatTime(meeting.startTime)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {meeting.durationMinutes} min
                    </div>
                  </div>
                </div>

                {/* Arrow / action */}
                <div className="text-sm text-slate-500">
                  View details →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;