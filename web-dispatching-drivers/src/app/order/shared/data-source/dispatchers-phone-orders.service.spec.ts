import { TestBed, inject } from '@angular/core/testing';

import { DispatchersPhoneOrdersService } from './dispatchers-phone-orders.service';

describe('DispatchersPhoneOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DispatchersPhoneOrdersService]
    });
  });

  it('should be created', inject([DispatchersPhoneOrdersService], (service: DispatchersPhoneOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
