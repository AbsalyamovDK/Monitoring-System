import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DeviceSession } from '../models/device-session.model';
import { DeviceSummary } from '../models/device-summary.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // Получить все устройства
  getDevices(): Observable<any[]> {
    console.log('🚀 Fetching devices from:', `${this.apiUrl}/devices`);
    return this.http.get<any[]>(`${this.apiUrl}/devices`).pipe(
      // tap(data => console.log('✅ Received devices:', data))
    );
  }

  // Получить сессии устройства
  getDeviceSessions(deviceId: string): Observable<DeviceSession[]> {
    console.log(`🚀 Fetching sessions for device: ${deviceId}`);
    return this.http.get<DeviceSession[]>(`${this.apiUrl}/devices/${deviceId}/sessions`).pipe(
      // tap(data => console.log(`✅ Received sessions for ${deviceId}:`, data))
    );
  }

  // Добавить новую сессию
  addSession(session: DeviceSession): Observable<any> {
    console.log('🚀 Adding session:', session);
    return this.http.post(`${this.apiUrl}/sessions`, session);
  }

  // Демо-устройства (если API не отвечает)
  getMockDevices(): DeviceSummary[] {
    return [
      { 
        deviceId: 'demo-001', 
        userName: 'Demo User', 
        latestVersion: '1.0.0.0', 
        totalSessions: 3, 
        lastActivity: '2024-01-21T12:00:00Z' 
      },
      { 
        deviceId: 'demo-002', 
        userName: 'Test User', 
        latestVersion: '2.0.0.0', 
        totalSessions: 5, 
        lastActivity: '2024-01-21T14:30:00Z' 
      }
    ];
  }

  // Демо-сессии (если API не отвечает)
  getMockSessions(deviceId: string): DeviceSession[] {
    return [
      { 
        _id: 'mock-1', 
        deviceId: deviceId, 
        userName: 'Demo User', 
        startTime: '2024-01-21T10:00:00Z', 
        endTime: '2024-01-21T12:00:00Z', 
        version: '1.0.0.0' 
      },
      { 
        _id: 'mock-2', 
        deviceId: deviceId, 
        userName: 'Demo User', 
        startTime: '2024-01-20T09:00:00Z', 
        endTime: '2024-01-20T11:00:00Z', 
        version: '1.0.0.0' 
      },
      { 
        _id: 'mock-3', 
        deviceId: deviceId, 
        userName: 'Demo User', 
        startTime: '2024-01-19T14:00:00Z', 
        endTime: '2024-01-19T16:30:00Z', 
        version: '1.0.0.0' 
      }
    ];
  }
}