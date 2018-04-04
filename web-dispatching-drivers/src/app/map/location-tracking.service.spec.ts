import { TestBed, inject } from '@angular/core/testing';

import { LocationTrackingService } from './location-tracking.service';

describe('LocationTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationTrackingService]
    });
  });

  it('should be created', inject([LocationTrackingService], (service: LocationTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
