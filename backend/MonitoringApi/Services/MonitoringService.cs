using System.Collections.Concurrent;
using MonitoringApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringApi.Services
{
    public class MonitoringService : IMonitoringService
    {
        private readonly ConcurrentDictionary<string, List<DeviceSession>> _sessions = new();

        public Task AddSessionAsync(DeviceSession session)
        {
            _sessions.AddOrUpdate(
                session.DeviceId,
                new List<DeviceSession> { session },
                (key, existingList) =>
                {
                    existingList.Add(session);
                    return existingList;
                });

            return Task.CompletedTask;
        }

        public Task<IEnumerable<DeviceSession>> GetAllSessionsAsync()
        {
            var allSessions = _sessions.Values.SelectMany(x => x);
            return Task.FromResult(allSessions);
        }

        public Task<IEnumerable<DeviceSession>> GetDeviceSessionsAsync(string deviceId)
        {
            if (_sessions.TryGetValue(deviceId, out var deviceSessions))
            {
                return Task.FromResult(deviceSessions.AsEnumerable());
            }

            return Task.FromResult(Enumerable.Empty<DeviceSession>());
        }

        public Task<IEnumerable<object>> GetAllDevicesAsync()
        {
            var devices = _sessions.Select(pair => new
            {
                DeviceId = pair.Key,
                UserName = pair.Value.LastOrDefault()?.UserName ?? "Unknown",
                TotalSessions = pair.Value.Count,
                LastActivity = pair.Value.Max(s => s.EndTime),
                LatestVersion = pair.Value.LastOrDefault()?.Version ?? "Unknown"
            });

            return Task.FromResult(devices.Cast<object>());
        }
    }
}