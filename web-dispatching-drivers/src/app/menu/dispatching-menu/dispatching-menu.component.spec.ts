import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchingMenuComponent } from './dispatching-menu.component';

describe('DispatchingMenuComponent', () => {
  let component: DispatchingMenuComponent;
  let fixture: ComponentFixture<DispatchingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
