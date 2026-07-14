using Microsoft.AspNetCore.Identity;

namespace meetwise_server.Models.Identity
{
    public class ApplicationUser: IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string? ProfileImage { get; set; }

        public string? Department { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastLogin { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
