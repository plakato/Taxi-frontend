import { TestBed, inject } from '@angular/core/testing';

import { CarRetrievalService } from './car-retrieval.service';

describe('CarRetrievalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarRetrievalService]
    });
  });

  it('should be created', inject([CarRetrievalService], (service: CarRetrievalService) => {
    expect(service).toBeTruthy();
  }));
});
