import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMarkerMapComponent } from './static-marker-map.component';

describe('StaticMarkerMapComponent', () => {
  let component: StaticMarkerMapComponent;
  let fixture: ComponentFixture<StaticMarkerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticMarkerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticMarkerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
