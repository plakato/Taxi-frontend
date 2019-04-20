import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchersPhoneOrdersComponent } from './dispatchers-phone-orders.component';

describe('DispatchersPhoneOrdersComponent', () => {
  let component: DispatchersPhoneOrdersComponent;
  let fixture: ComponentFixture<DispatchersPhoneOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchersPhoneOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchersPhoneOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
