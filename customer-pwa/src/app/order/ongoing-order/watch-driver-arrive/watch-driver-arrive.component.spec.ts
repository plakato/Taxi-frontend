import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDriverArriveComponent } from './watch-driver-arrive.component';

describe('WatchDriverArriveComponent', () => {
  let component: WatchDriverArriveComponent;
  let fixture: ComponentFixture<WatchDriverArriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchDriverArriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDriverArriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
