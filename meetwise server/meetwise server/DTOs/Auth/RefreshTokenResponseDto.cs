namespace meetwise_server.DTOs.Auth
{
    public class RefreshTokenResponseDto
    {
        public string Token { get; set; } = string.Empty;

        public string RefreshToken { get; set; } = string.Empty;

        public DateTime Expiration { get; set; }
    }
}
