namespace meetwise_server.DTOs.Meeting
{
    public class MeetingResponseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime MeetingDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public int DurationMinutes { get; set; }

        public string Status { get; set; } = string.Empty;

        public string? RecordingFileName { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
