namespace meetwise_server.DTOs.Auth;

public class AuthResponseDto
{
  

    public string? Token { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? Expiration { get; set; }

    public string? Email { get; set; }

    public string? FullName { get; set; }

    public IList<string>? Roles { get; set; }
}