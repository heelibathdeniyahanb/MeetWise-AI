using System.Security.Claims;
using meetwise_server.DTOs.User;
using meetwise_server.Models.Identity;
using meetwise_server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace meetwise_server.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserProfileDto?> GetCurrentUserAsync(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);

        if (user == null)
            return null;

        return new UserProfileDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email!,
            Department = user.Department,
            ProfileImage = user.ProfileImage,
            CreatedAt = user.CreatedAt,
            LastLogin = user.LastLogin,
            Roles = await _userManager.GetRolesAsync(user)
        };
    }
}