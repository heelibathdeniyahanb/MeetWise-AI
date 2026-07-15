using meetwise_server.DTOs.User;
using System.Security.Claims;

public interface IUserService
{
    Task<UserProfileDto?> GetCurrentUserAsync(ClaimsPrincipal principal);
}