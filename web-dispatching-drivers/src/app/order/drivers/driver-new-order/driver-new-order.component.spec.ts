import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNewOrderComponent } from './driver-new-order.component';

describe('DriverNewOrderComponent', () => {
  let component: DriverNewOrderComponent;
  let fixture: ComponentFixture<DriverNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
