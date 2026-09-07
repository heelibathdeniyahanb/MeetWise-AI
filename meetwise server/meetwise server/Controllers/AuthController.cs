using meetwise_server.DTOs.Auth;
using meetwise_server.Helpers;
using meetwise_server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace meetwise_server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public AuthController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        return Ok(
            ApiResponseHelper.Success(
                result,
                "Registration successful."));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        return Ok(
            ApiResponseHelper.Success(
                result,
                "Login successful."));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _userService.GetCurrentUserAsync(User);

        if (user == null)
            return Unauthorized();

        return Ok(
    ApiResponseHelper.Success(
        user,
        "User profile retrieved successfully."
    ));
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(
    RefreshTokenDto dto)
    {
        var result =
            await _authService.RefreshTokenAsync(
                dto.RefreshToken);

        return Ok(
            ApiResponseHelper.Success(
                result,
                "Token refreshed successfully."));
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(
    RefreshTokenDto dto)
    {
        await _authService.LogoutAsync(dto.RefreshToken);

        return Ok(
            ApiResponseHelper.Success(
                new { },
                "Logout successful."));
    }
}