import { TestBed, inject } from '@angular/core/testing';

import { TrackDriverService } from './track-driver.service';

describe('TrackDriverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackDriverService]
    });
  });

  it('should be created', inject([TrackDriverService], (service: TrackDriverService) => {
    expect(service).toBeTruthy();
  }));
});
