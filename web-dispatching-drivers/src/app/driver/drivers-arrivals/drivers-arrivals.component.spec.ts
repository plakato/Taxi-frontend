import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversArrivalsComponent } from './drivers-arrivals.component';

describe('DriversArrivalsComponent', () => {
  let component: DriversArrivalsComponent;
  let fixture: ComponentFixture<DriversArrivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversArrivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
