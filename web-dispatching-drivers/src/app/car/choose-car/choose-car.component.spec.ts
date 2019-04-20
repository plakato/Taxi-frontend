import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCarComponent } from './choose-car.component';

describe('ChooseCarComponent', () => {
  let component: ChooseCarComponent;
  let fixture: ComponentFixture<ChooseCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
