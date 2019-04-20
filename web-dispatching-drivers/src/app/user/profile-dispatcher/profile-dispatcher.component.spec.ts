import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDispatcherComponent } from './profile-dispatcher.component';

describe('ProfileDispatcherComponent', () => {
  let component: ProfileDispatcherComponent;
  let fixture: ComponentFixture<ProfileDispatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDispatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
