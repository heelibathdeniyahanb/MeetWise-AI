using meetwise_server.Common;
using meetwise_server.Data;
using meetwise_server.DTOs.Meeting;
using meetwise_server.Models;
using meetwise_server.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace meetwise_server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MeetingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public MeetingsController(
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // GET: api/meetings
    [HttpGet]
    public async Task<IActionResult> GetMeetings()
    {
        var userId = _userManager.GetUserId(User);

        var meetings = await _context.Meetings
            .Where(x => x.CreatedById == userId)
            .OrderByDescending(x => x.MeetingDate)
            .Select(x => new MeetingResponseDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                MeetingDate = x.MeetingDate,
                StartTime = x.StartTime,
                DurationMinutes = x.DurationMinutes,
                Status = x.Status,
                RecordingFileName = x.RecordingFileName,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();

        return Ok(new ApiResponse<List<MeetingResponseDto>>
        {
            Success = true,
            Message = "Meetings retrieved successfully.",
            Data = meetings
        });
    }

    // GET: api/meetings/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMeeting(Guid id)
    {
        var userId = _userManager.GetUserId(User);

        var meeting = await _context.Meetings
            .Where(x => x.Id == id && x.CreatedById == userId)
            .Select(x => new MeetingResponseDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                MeetingDate = x.MeetingDate,
                StartTime = x.StartTime,
                DurationMinutes = x.DurationMinutes,
                Status = x.Status,
                RecordingFileName = x.RecordingFileName,
                CreatedAt = x.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (meeting == null)
        {
            return NotFound(new ApiResponse<MeetingResponseDto>
            {
                Success = false,
                Message = "Meeting not found."
            });
        }

        return Ok(new ApiResponse<MeetingResponseDto>
        {
            Success = true,
            Message = "Meeting retrieved successfully.",
            Data = meeting
        });
    }

    // POST: api/meetings
    [HttpPost]
    public async Task<IActionResult> CreateMeeting(
        [FromBody] CreateMeetingDto dto)
    {
        var userId = _userManager.GetUserId(User);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var meeting = new Meeting
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            MeetingDate = dto.MeetingDate,
            StartTime = dto.StartTime,
            DurationMinutes = dto.DurationMinutes,
            Status = "Pending",
            CreatedById = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Meetings.Add(meeting);

        await _context.SaveChangesAsync();

        var response = new MeetingResponseDto
        {
            Id = meeting.Id,
            Title = meeting.Title,
            Description = meeting.Description,
            MeetingDate = meeting.MeetingDate,
            StartTime = meeting.StartTime,
            DurationMinutes = meeting.DurationMinutes,
            Status = meeting.Status,
            RecordingFileName = meeting.RecordingFileName,
            CreatedAt = meeting.CreatedAt
        };

        return CreatedAtAction(
            nameof(GetMeeting),
            new { id = meeting.Id },
            new ApiResponse<MeetingResponseDto>
            {
                Success = true,
                Message = "Meeting created successfully.",
                Data = response
            });
    }
}