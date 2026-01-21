import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSessionsComponent } from './device-sessions.component';

describe('DeviceSessionsComponent', () => {
  let component: DeviceSessionsComponent;
  let fixture: ComponentFixture<DeviceSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
