using meetwise_server.Data;
using meetwise_server.Helpers;
using meetwise_server.Models.Auth;
using meetwise_server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace meetwise_server.Services;

public class RefreshTokenService : IRefreshTokenService
{
    private readonly ApplicationDbContext _context;

    public RefreshTokenService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> GenerateRefreshTokenAsync(string userId)
    {
        var refreshToken = CryptoHelper.GenerateSecureToken();

        var hashedToken = CryptoHelper.ComputeSha256(refreshToken);

        var entity = new RefreshToken
        {
            UserId = userId,
            TokenHash = hashedToken,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        _context.RefreshTokens.Add(entity);

        await _context.SaveChangesAsync();

        // Return ORIGINAL token to client
        return refreshToken;
    }

    public async Task<RefreshToken?> ValidateRefreshTokenAsync(string refreshToken)
    {
        var hashed = CryptoHelper.ComputeSha256(refreshToken);

        var token = await _context.RefreshTokens
        .Include(x => x.User)
        .FirstOrDefaultAsync(x =>
            x.TokenHash == hashed &&
            x.RevokedAt == null);

        if (token == null)
            return null;

        if (token.ExpiresAt <= DateTime.UtcNow)
            return null;

        return token;
    }

    public async Task<bool> RevokeRefreshTokenAsync(
        string refreshToken,
        string? replacedByTokenHash = null)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
            return false;

        var hashedToken =
            CryptoHelper.ComputeSha256(refreshToken);

        var token = await _context.RefreshTokens
            .FirstOrDefaultAsync(x =>
                x.TokenHash == hashedToken);

        if (token == null)
            return false;

        if (token.RevokedAt != null)
            return false;

        token.RevokedAt = DateTime.UtcNow;
        token.ReplacedByTokenHash = replacedByTokenHash;

        await _context.SaveChangesAsync();

        return true;
    }  
}