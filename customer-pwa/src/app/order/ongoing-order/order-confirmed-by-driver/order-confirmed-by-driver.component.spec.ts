import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmedByDriverComponent } from './order-confirmed-by-driver.component';

describe('OrderConfirmedByDriverComponent', () => {
  let component: OrderConfirmedByDriverComponent;
  let fixture: ComponentFixture<OrderConfirmedByDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConfirmedByDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmedByDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
