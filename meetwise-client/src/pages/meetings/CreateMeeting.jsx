import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import meetingService from "../../services/meetingService";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  FileAudio,
  Upload,
  X,
} from "lucide-react";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    duration: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFile = (file) => {
    if (!file) return;

    const allowedExtensions = [
      ".mp3",
      ".wav",
      ".m4a",
      ".webm",
      ".mp4",
      ".mkv",
    ];
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      alert("Please upload a supported audio or video file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const meetingData = {
        title: formData.title,
        description: formData.description || null,
        meetingDate: formData.date,
        startTime: `${formData.startTime}:00`,
        durationMinutes: Number(formData.duration),
      };

      const response = await meetingService.createMeeting(meetingData);

      if (response?.success === false) {
        throw new Error(response.message || "Failed to create meeting.");
      }

      const createdMeeting = response?.data ?? response;
      const meetingId = createdMeeting?.id ?? createdMeeting?.meetingId;
      navigate(meetingId ? `/meetings/${meetingId}` : "/meetings");
    } catch (error) {
      console.error("Create meeting error:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Could not save the meeting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/meetings")}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            New Meeting
          </h1>

          <p className="mt-1 text-slate-400">
            Create a meeting and upload its recording for AI analysis.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Meeting Details */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Meeting Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about your meeting.
            </p>
          </div>

          <div className="space-y-5">

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Meeting Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Sprint Planning"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="What is this meeting about?"
                className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Date / Time / Duration */}
            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Start Time
                </label>

                <div className="relative">
                  <Clock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Duration
                </label>

                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500"
                >
                  <option value="">Select duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Recording */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Meeting Recording
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload the recording that MeetWise will transcribe and analyze.
            </p>
          </div>

          {!selectedFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
                dragging
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-700 hover:border-indigo-500 hover:bg-slate-800/40"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                <Upload size={25} />
              </div>

              <h3 className="mt-4 font-medium">
                Upload meeting recording
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Drag and drop your file here, or click to browse
              </p>

              <p className="mt-3 text-xs text-slate-600">
                MP3, WAV, M4A, MP4, WebM or MKV
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <FileAudio size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-red-400"
              >
                <X size={18} />
              </button>

            </div>
          )}

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => navigate("/meetings")}
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          {submitError && (
            <p role="alert" className="mr-auto self-center text-sm text-red-400">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            {isSubmitting ? "Saving..." : "Create Meeting"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default CreateMeeting;