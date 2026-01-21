import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceSessionsComponent } from './device-sessions/device-sessions.component';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesListComponent },
  { path: 'devices/:deviceId/sessions', component: DeviceSessionsComponent },
  { path: '**', redirectTo: '/devices' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }