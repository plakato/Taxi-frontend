import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverArrivingComponent } from './driver-arriving.component';

describe('DriverArrivingComponent', () => {
  let component: DriverArrivingComponent;
  let fixture: ComponentFixture<DriverArrivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverArrivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverArrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
