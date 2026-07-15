using meetwise_server.Helpers;
using Microsoft.AspNetCore.Identity;

namespace meetwise_server.Data;

public static class DbInitializer
{
    public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        string[] roles =
        {
            RoleHelper.Admin,
            RoleHelper.Manager,
            RoleHelper.Member
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}