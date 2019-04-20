import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForConfirmationComponent } from './wait-for-confirmation.component';

describe('WaitForConfirmationComponent', () => {
  let component: WaitForConfirmationComponent;
  let fixture: ComponentFixture<WaitForConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
