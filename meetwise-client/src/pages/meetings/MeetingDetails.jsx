import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Users,
  FileAudio,
  Play,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Loader2,
} from "lucide-react";
import meetingService from "../../services/meetingService";

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMeeting = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await meetingService.getMeeting(id);

        if (response.success && response.data) {
          setMeeting(response.data);
        } else {
          setError(response.message || "Meeting not found.");
        }
      } catch (err) {
        console.error("Failed to load meeting:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load meeting details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMeeting();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
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

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 size={22} className="animate-spin" />
          Loading meeting...
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate("/meetings")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Meetings
        </button>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h2 className="text-lg font-semibold text-red-400">
            Unable to load meeting
          </h2>

          <p className="mt-2 text-sm text-red-300">
            {error || "Meeting not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/meetings")}
        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Meetings
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                {meeting.status}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              {meeting.title}
            </h1>

            {meeting.description && (
              <p className="mt-3 max-w-3xl text-slate-400">
                {meeting.description}
              </p>
            )}
          </div>
        </div>

        {/* Meeting information */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <CalendarDays
                size={18}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">Date</p>

              <p className="text-sm text-slate-200">
                {formatDate(meeting.meetingDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <Clock3
                size={18}
                className="text-purple-400"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Time & Duration
              </p>

              <p className="text-sm text-slate-200">
                {formatTime(meeting.startTime)} ·{" "}
                {meeting.durationMinutes} minutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <Users
                size={18}
                className="text-emerald-400"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Participants
              </p>

              <p className="text-sm text-slate-200">
                Participants will be added later
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recording */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <FileAudio
              size={20}
              className="text-blue-400"
            />
            Meeting Recording
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload a recording to generate a transcript and AI
            insights.
          </p>
        </div>

        {meeting.recordingFileName ? (
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-medium text-slate-200">
                {meeting.recordingFileName}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Recording uploaded
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              <Play size={16} />
              Play
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
            <FileAudio
              size={36}
              className="mx-auto text-slate-600"
            />

            <p className="mt-3 text-sm text-slate-400">
              No recording uploaded yet.
            </p>

            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              Upload Recording
            </button>
          </div>
        )}
      </section>

      {/* AI Analysis */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Sparkles
            size={20}
            className="text-purple-400"
          />
          AI Meeting Analysis
        </h2>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
          <Sparkles
            size={36}
            className="mx-auto text-slate-600"
          />

          <h3 className="mt-4 font-medium text-slate-300">
            AI analysis is not available yet
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            Upload a meeting recording first. Once transcription
            and AI analysis are implemented, the summary,
            decisions, action items, risks, and questions will
            appear here.
          </p>
        </div>
      </section>

      {/* Future AI sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <CheckCircle2
              size={20}
              className="text-emerald-400"
            />
            Key Decisions
          </h2>

          <p className="mt-4 text-sm text-slate-500">
            AI-generated decisions will appear here after
            analysis.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <AlertTriangle
              size={20}
              className="text-yellow-400"
            />
            Risks & Blockers
          </h2>

          <p className="mt-4 text-sm text-slate-500">
            AI-detected risks and blockers will appear here.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <HelpCircle
              size={20}
              className="text-purple-400"
            />
            Open Questions
          </h2>

          <p className="mt-4 text-sm text-slate-500">
            Open questions extracted from the meeting will
            appear here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MeetingDetails;