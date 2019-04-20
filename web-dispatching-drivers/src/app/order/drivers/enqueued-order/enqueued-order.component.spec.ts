import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnqueuedOrderComponent } from './enqueued-order.component';

describe('EnqueuedOrderComponent', () => {
  let component: EnqueuedOrderComponent;
  let fixture: ComponentFixture<EnqueuedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnqueuedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnqueuedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
