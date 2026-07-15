using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using meetwise_server.Models.Identity;

namespace meetwise_server.Models.Auth;

public class RefreshToken
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string TokenHash { get; set; } = string.Empty;

    [Required]
    public DateTime ExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAt { get; set; }

    public bool IsRevoked => RevokedAt != null;

    public string? ReplacedByTokenHash { get; set; }

    // FK
    [Required]
    public string UserId { get; set; } = string.Empty;

    [ForeignKey(nameof(UserId))]
    public ApplicationUser User { get; set; } = null!;
}