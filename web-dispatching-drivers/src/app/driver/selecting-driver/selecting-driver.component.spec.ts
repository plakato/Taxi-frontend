import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingDriverComponent } from './selecting-driver.component';

describe('SelectingDriverComponent', () => {
  let component: SelectingDriverComponent;
  let fixture: ComponentFixture<SelectingDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
