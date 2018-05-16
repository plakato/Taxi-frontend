import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInParamsComponent } from './fill-in-params.component';

describe('FillInParamsComponent', () => {
  let component: FillInParamsComponent;
  let fixture: ComponentFixture<FillInParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
