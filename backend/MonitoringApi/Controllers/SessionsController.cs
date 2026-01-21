using Microsoft.AspNetCore.Mvc;
using MonitoringApi.Models;
using MonitoringApi.Services;

namespace MonitoringApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionsController : ControllerBase
    {
        private readonly IMonitoringService _monitoringService;

        public SessionsController(IMonitoringService monitoringService)
        {
            _monitoringService = monitoringService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] DeviceSession session)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _monitoringService.AddSessionAsync(session);
            return Ok(new { message = "Session added successfully", sessionId = session.Id });
        }
    }
}