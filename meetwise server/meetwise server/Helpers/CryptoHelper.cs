using System.Security.Cryptography;
using System.Text;

namespace meetwise_server.Helpers;

public static class CryptoHelper
{
    public static string ComputeSha256(string value)
    {
        using var sha = SHA256.Create();

        var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(value));

        return Convert.ToHexString(hash);
    }

    public static string GenerateSecureToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);

        return Convert.ToBase64String(bytes);
    }
}