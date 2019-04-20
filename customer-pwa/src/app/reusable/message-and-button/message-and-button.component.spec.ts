import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAndButtonComponent } from './message-and-button.component';

describe('MessageAndButtonComponent', () => {
  let component: MessageAndButtonComponent;
  let fixture: ComponentFixture<MessageAndButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAndButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAndButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
