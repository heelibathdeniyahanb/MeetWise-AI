using meetwise_server.DTOs.Auth;
using meetwise_server.Helpers;
using meetwise_server.Models.Identity;
using meetwise_server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace meetwise_server.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IJwtService _jwtService;
    private readonly IRefreshTokenService _refreshTokenService;


    public AuthService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IJwtService jwtService,
        IRefreshTokenService refreshTokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existingUser = await _userManager.FindByEmailAsync(dto.Email);

        if (existingUser != null)
        {
            throw new Exception("Email already exists.");
        }

        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            throw new Exception(
                string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        // Default role
        await _userManager.AddToRoleAsync(user, RoleHelper.Member);

        var jwt = await _jwtService.GenerateTokenAsync(user.Id);

        var refreshToken =
            await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);

        return new AuthResponseDto
        {
            

            Token = jwt.Token,
            RefreshToken = refreshToken,
            Expiration = jwt.Expiration,

            Email = user.Email,
            FullName = $"{user.FirstName} {user.LastName}",
            Roles = await _userManager.GetRolesAsync(user)
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);

        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

        if (!result.Succeeded)
        {
            throw new Exception("Invalid email or password.");
        }

        user.LastLogin = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        var jwt = await _jwtService.GenerateTokenAsync(user.Id);
        var refreshToken = await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);


        return new AuthResponseDto
        {
           
            Token = jwt.Token,
            RefreshToken = refreshToken,
            Expiration = jwt.Expiration,
            Email = user.Email,
            FullName = $"{user.FirstName} {user.LastName}",
            Roles = await _userManager.GetRolesAsync(user)
        };
    }
}