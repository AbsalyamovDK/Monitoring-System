import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoringService } from '../services/monitoring.service';

@Component({
  selector: 'app-device-sessions',
  templateUrl: './device-sessions.component.html',
  styleUrls: ['./device-sessions.component.less']
})
export class DeviceSessionsComponent implements OnInit {
  deviceId: string = '';
  sessions: any[] = [];
  loading = false;
  error = '';
  deviceInfo: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService
  ) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('deviceId') || '';
    console.log('Device ID from route:', this.deviceId);
    
    if (!this.deviceId) {
      this.router.navigate(['/devices']);
      return;
    }
    
    this.loadSessions();
  }

  loadSessions(): void {
    this.loading = true;
    this.error = '';
    
    this.monitoringService.getDeviceSessions(this.deviceId).subscribe({
      next: (data) => {
        console.log('Sessions loaded:', data);
        this.sessions = data;
        this.loading = false;
        
        if (!this.sessions || this.sessions.length === 0) {
          this.error = 'No sessions found for this device';
          this.sessions = this.monitoringService.getMockSessions(this.deviceId);
        }
        
        // Получить информацию об устройстве
        this.monitoringService.getDevices().subscribe(devices => {
          this.deviceInfo = devices.find((d: any) => 
            d.deviceId === this.deviceId || d.deviceid === this.deviceId
          );
          if (!this.deviceInfo) {
            this.deviceInfo = { userName: 'Unknown', latestVersion: 'Unknown' };
          }
        });
      },
      error: (err) => {
        console.error('Error loading sessions:', err);
        this.error = 'Failed to load sessions. Using demo data.';
        this.sessions = this.monitoringService.getMockSessions(this.deviceId);
        this.deviceInfo = { userName: 'Demo User', latestVersion: 'Demo' };
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }

  formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  }

  calculateDuration(start: string, end: string): string {
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const durationMs = endTime.getTime() - startTime.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch {
      return 'N/A';
    }
  }
}