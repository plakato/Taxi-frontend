import { TestBed, inject } from '@angular/core/testing';

import { MyOrdersService } from './my-orders.service';

describe('MyOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyOrdersService]
    });
  });

  it('should be created', inject([MyOrdersService], (service: MyOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
