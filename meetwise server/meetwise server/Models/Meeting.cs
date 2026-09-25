using meetwise_server.Models.Identity;

namespace meetwise_server.Models
{
    public class Meeting
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime MeetingDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public int DurationMinutes { get; set; }

        public string Status { get; set; } = "Pending";

        public string? RecordingFileName { get; set; }

        public string? RecordingFilePath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // User who created the meeting
        public string CreatedById { get; set; } = string.Empty;

        public Identity.ApplicationUser CreatedBy { get; set; } = null!;
    }
}
