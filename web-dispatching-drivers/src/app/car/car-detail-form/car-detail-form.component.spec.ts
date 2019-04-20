import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailFormComponent } from './car-detail-form.component';

describe('CarDetailFormComponent', () => {
  let component: CarDetailFormComponent;
  let fixture: ComponentFixture<CarDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
