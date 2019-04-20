import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEditingComponent } from './time-editing.component';

describe('TimeEditingComponent', () => {
  let component: TimeEditingComponent;
  let fixture: ComponentFixture<TimeEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
