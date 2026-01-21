using MonitoringApi.Models;

namespace MonitoringApi.Services
{
    public interface IMonitoringService
    {
        Task AddSessionAsync(DeviceSession session);
        Task<IEnumerable<DeviceSession>> GetAllSessionsAsync();
        Task<IEnumerable<DeviceSession>> GetDeviceSessionsAsync(string deviceId);
        Task<IEnumerable<object>> GetAllDevicesAsync();
    }
}