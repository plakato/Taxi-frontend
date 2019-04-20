import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAirportOrderComponent } from './create-airport-order.component';

describe('CreateAirportOrderComponent', () => {
  let component: CreateAirportOrderComponent;
  let fixture: ComponentFixture<CreateAirportOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAirportOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAirportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
