using meetwise_server.Models.Auth;
using meetwise_server.Models.Identity;
using meetwise_server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace meetwise_server.Services;

public class JwtService : IJwtService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public JwtService(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<JwtTokenResult> GenerateTokenAsync(string userId)
    {
        var key = Environment.GetEnvironmentVariable("JWT_KEY")!;

        var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER")!;

        var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")!;

        var duration = double.Parse(
            Environment.GetEnvironmentVariable("JWT_DURATION")!);
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            throw new Exception("User not found.");

        var roles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub,user.Id),
            new(JwtRegisteredClaimNames.Email,user.Email!),
            new(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

            new("FirstName",user.FirstName),
            new("LastName",user.LastName)
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var securityKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256);

        var expires = DateTime.UtcNow.AddMinutes(duration);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expires,
            signingCredentials: creds);

        return new JwtTokenResult
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = expires
        };

       
    }
}