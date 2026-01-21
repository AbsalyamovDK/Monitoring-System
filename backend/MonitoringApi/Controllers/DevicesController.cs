using Microsoft.AspNetCore.Mvc;
using MonitoringApi.Services;

namespace MonitoringApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly IMonitoringService _monitoringService;

        public DevicesController(IMonitoringService monitoringService)
        {
            _monitoringService = monitoringService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDevices()
        {
            var devices = await _monitoringService.GetAllDevicesAsync();
            return Ok(devices);
        }

        [HttpGet("{deviceId}/sessions")]
        public async Task<IActionResult> GetDeviceSessions(string deviceId)
        {
            if (string.IsNullOrWhiteSpace(deviceId))
            {
                return BadRequest("Device ID is required");
            }

            var sessions = await _monitoringService.GetDeviceSessionsAsync(deviceId);
            return Ok(sessions);
        }
    }
}