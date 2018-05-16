import { TestBed, inject } from '@angular/core/testing';

import { MyLocationService } from './my-location.service';

describe('MyLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLocationService]
    });
  });

  it('should be created', inject([MyLocationService], (service: MyLocationService) => {
    expect(service).toBeTruthy();
  }));
});
