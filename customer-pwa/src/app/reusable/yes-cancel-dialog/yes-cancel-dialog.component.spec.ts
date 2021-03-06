import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesCancelDialogComponent } from './yes-cancel-dialog.component';

describe('YesCancelDialogComponent', () => {
  let component: YesCancelDialogComponent;
  let fixture: ComponentFixture<YesCancelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesCancelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
