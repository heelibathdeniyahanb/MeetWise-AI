using meetwise_server.Models.Auth;

namespace meetwise_server.Services.Interfaces;

public interface IJwtService
{
   
   Task<JwtTokenResult> GenerateTokenAsync(string userId);
}