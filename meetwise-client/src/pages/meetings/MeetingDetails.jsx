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
  CircleDot,
} from "lucide-react";

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary mock data
  const meeting = {
    id,
    title: "Sprint Planning",
    description:
      "Planning the upcoming sprint, discussing priorities, assigning tasks, and reviewing blockers.",
    date: "September 24, 2026",
    time: "10:00 AM",
    duration: "45 minutes",
    status: "Analyzed",
    participants: [
      "Nimasha",
      "Taniya",
      "Naveesha",
      "Kasun",
      "Tharindu",
      "Amal",
    ],
    recording: {
      name: "sprint-planning-2026-09-24.mkv",
      duration: "45:12",
      size: "86.4 MB",
    },
    summary:
      "The team discussed the upcoming sprint goals, prioritized the main development tasks, reviewed existing blockers, and assigned responsibilities to team members.",
    decisions: [
      "The authentication module will be completed first.",
      "The meeting transcription feature will be implemented next.",
      "Frontend and backend development will proceed in parallel.",
    ],
    actionItems: [
      {
        task: "Complete JWT authentication integration",
        assignee: "Nimasha",
        deadline: "September 27, 2026",
      },
      {
        task: "Create meeting details page",
        assignee: "Taniya",
        deadline: "September 26, 2026",
      },
      {
        task: "Prepare database structure for meetings",
        assignee: "Naveesha",
        deadline: "September 28, 2026",
      },
    ],
    risks: [
      "Large recording files may increase processing time.",
      "AI transcription accuracy may vary depending on audio quality.",
    ],
    questions: [
      "Should meetings automatically be analyzed after upload?",
      "Should participants receive notifications when action items are assigned?",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
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
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {meeting.status}
              </span>

              <span className="text-sm text-slate-500">
                Meeting #{meeting.id}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              {meeting.title}
            </h1>

            <p className="mt-3 max-w-3xl text-slate-400">
              {meeting.description}
            </p>
          </div>

          <button
            onClick={() => navigate("/meetings")}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Edit Meeting
          </button>
        </div>

        {/* Meeting information */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <CalendarDays size={18} className="text-blue-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Date</p>
              <p className="text-sm text-slate-200">{meeting.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <Clock3 size={18} className="text-purple-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Time & Duration</p>
              <p className="text-sm text-slate-200">
                {meeting.time} · {meeting.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-800 p-2">
              <Users size={18} className="text-emerald-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Participants</p>
              <p className="text-sm text-slate-200">
                {meeting.participants.length} people
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recording */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <FileAudio size={20} className="text-blue-400" />
              Meeting Recording
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Original recording uploaded for this meeting
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            <Play size={16} />
            Play
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-slate-200">
              {meeting.recording.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {meeting.recording.duration} · {meeting.recording.size}
            </p>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            Uploaded
          </span>
        </div>
      </section>

      {/* AI Summary */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Sparkles size={20} className="text-purple-400" />
          AI Meeting Summary
        </h2>

        <p className="mt-4 leading-7 text-slate-300">{meeting.summary}</p>
      </section>

      {/* Decisions */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <CheckCircle2 size={20} className="text-emerald-400" />
          Key Decisions
        </h2>

        <div className="mt-4 space-y-3">
          {meeting.decisions.map((decision, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg bg-slate-950 p-4"
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-sm text-slate-300">{decision}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Items */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <CircleDot size={20} className="text-blue-400" />
          Action Items
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase text-slate-500">
                <th className="pb-3">Task</th>
                <th className="pb-3">Assigned To</th>
                <th className="pb-3">Deadline</th>
              </tr>
            </thead>

            <tbody>
              {meeting.actionItems.map((item, index) => (
                <tr key={index} className="border-b border-slate-800 last:border-0">
                  <td className="py-4 text-sm text-slate-300">
                    {item.task}
                  </td>

                  <td className="py-4 text-sm text-slate-400">
                    {item.assignee}
                  </td>

                  <td className="py-4 text-sm text-slate-400">
                    {item.deadline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risks and Questions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Risks */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <AlertTriangle size={20} className="text-yellow-400" />
            Risks & Blockers
          </h2>

          <div className="mt-4 space-y-3">
            {meeting.risks.map((risk, index) => (
              <div
                key={index}
                className="rounded-lg bg-yellow-500/5 p-4 text-sm text-slate-300"
              >
                {risk}
              </div>
            ))}
          </div>
        </section>

        {/* Questions */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <HelpCircle size={20} className="text-purple-400" />
            Open Questions
          </h2>

          <div className="mt-4 space-y-3">
            {meeting.questions.map((question, index) => (
              <div
                key={index}
                className="rounded-lg bg-purple-500/5 p-4 text-sm text-slate-300"
              >
                {question}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MeetingDetails;