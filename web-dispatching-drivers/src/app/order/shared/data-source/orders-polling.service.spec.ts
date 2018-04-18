import { TestBed, inject } from '@angular/core/testing';
import { OrdersPollingService } from './orders-polling.service';

describe('OrdersPollingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersPollingService]
    });
  });

  it('should be created', inject([OrdersPollingService], (service: OrdersPollingService) => {
    expect(service).toBeTruthy();
  }));
});
