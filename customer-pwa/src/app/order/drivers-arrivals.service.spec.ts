import { TestBed, inject } from '@angular/core/testing';

import { DriversArrivalsService } from './drivers-arrivals.service';

describe('DriversArrivalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversArrivalsService]
    });
  });

  it('should be created', inject([DriversArrivalsService], (service: DriversArrivalsService) => {
    expect(service).toBeTruthy();
  }));
});
