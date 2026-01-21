import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DeviceSession, DeviceSummary } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<any[]> {
    console.log('Fetching devices from:', `${this.apiUrl}/devices`);
    return this.http.get<any[]>(`${this.apiUrl}/devices`);
  }

  getDeviceSessions(deviceId: string): Observable<DeviceSession[]> {
    return this.http.get<DeviceSession[]>(`${this.apiUrl}/devices/${deviceId}/sessions`);
  }

  addSession(session: DeviceSession): Observable<any> {
    return this.http.post(`${this.apiUrl}/sessions`, session);
  }

  getMockDevices(): any[] {
    return [
      { deviceId: 'demo-001', userName: 'Demo User', latestVersion: '1.0.0.0', totalSessions: 3, lastActivity: '2024-01-21T12:00:00Z' },
      { deviceId: 'demo-002', userName: 'Test User', latestVersion: '2.0.0.0', totalSessions: 5, lastActivity: '2024-01-21T14:30:00Z' }
    ];
  }
}