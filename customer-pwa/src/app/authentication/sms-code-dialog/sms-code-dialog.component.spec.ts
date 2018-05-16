import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCodeDialogComponent } from './sms-code-dialog.component';

describe('SmsCodeDialogComponent', () => {
  let component: SmsCodeDialogComponent;
  let fixture: ComponentFixture<SmsCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
