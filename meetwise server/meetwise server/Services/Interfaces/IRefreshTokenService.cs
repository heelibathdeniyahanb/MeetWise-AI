using meetwise_server.Models.Auth;

namespace meetwise_server.Services.Interfaces;

public interface IRefreshTokenService
{
    Task<string> GenerateRefreshTokenAsync(string userId);

    Task<RefreshToken?> ValidateRefreshTokenAsync(string refreshToken);

    Task<bool> RevokeRefreshTokenAsync(string refreshToken);
}