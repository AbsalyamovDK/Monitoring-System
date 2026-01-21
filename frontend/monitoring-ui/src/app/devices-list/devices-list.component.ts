import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoringService } from '../services/monitoring.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent implements OnInit {
  devices: any[] = [];
  loading = false;
  error = '';

  constructor(
    private monitoringService: MonitoringService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.loading = true;
    this.error = '';
    
    this.monitoringService.getDevices().subscribe({
      next: (data) => {
        console.log('Devices loaded:', data);
        this.devices = data;
        this.loading = false;
        
        // Если нет данных, покажем демо
        if (!this.devices || this.devices.length === 0) {
          this.devices = this.monitoringService.getMockDevices();
        }
      },
      error: (err) => {
        console.error('Error loading devices:', err);
        this.error = 'Failed to load devices. Using demo data.';
        this.devices = this.monitoringService.getMockDevices();
        this.loading = false;
      }
    });
  }

  viewDeviceSessions(deviceId: string): void {
    this.router.navigate(['/devices', deviceId, 'sessions']);
  }

  formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  }
}