import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedFraudComponent } from './marked-fraud.component';

describe('MarkedFraudComponent', () => {
  let component: MarkedFraudComponent;
  let fixture: ComponentFixture<MarkedFraudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedFraudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedFraudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
