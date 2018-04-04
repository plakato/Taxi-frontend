import { TestBed, inject } from '@angular/core/testing';

import { ScheduledOrdersService } from './scheduled-orders.service';

describe('ScheduledOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduledOrdersService]
    });
  });

  it('should be created', inject([ScheduledOrdersService], (service: ScheduledOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
