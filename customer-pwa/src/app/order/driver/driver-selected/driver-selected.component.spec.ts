import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSelectedComponent } from './driver-selected.component';

describe('DriverSelectedComponent', () => {
  let component: DriverSelectedComponent;
  let fixture: ComponentFixture<DriverSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
