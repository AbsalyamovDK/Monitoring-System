using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MonitoringApi.Models
{
    public class DeviceSession
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string DeviceId { get; set; } = string.Empty;

        public string? UserName { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public string Version { get; set; } = string.Empty;
    }
}