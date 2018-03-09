import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordInputComponent } from './new-password-input.component';

describe('NewPasswordInputComponent', () => {
  let component: NewPasswordInputComponent;
  let fixture: ComponentFixture<NewPasswordInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
