namespace meetwise_server.Models.Auth;

public class JwtTokenResult
{
    public string Token { get; set; } = string.Empty;

    public DateTime Expiration { get; set; }
}