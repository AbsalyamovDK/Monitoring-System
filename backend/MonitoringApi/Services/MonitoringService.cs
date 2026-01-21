using System.Collections.Concurrent;
using MonitoringApi.Models;

namespace MonitoringApi.Services
{
    public class MonitoringService : IMonitoringService
    {
        // In-memory хранилище: ключ - DeviceId, значение - список сессий
        private readonly ConcurrentDictionary<string, List<DeviceSession>> _sessions = new();

        public Task AddSessionAsync(DeviceSession session)
        {
            // ≈сли устройство уже есть, добавл€ем сессию в список
            // ≈сли нет - создаем новый список с одной сессией
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
            // ¬озвращаем все сессии всех устройств
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