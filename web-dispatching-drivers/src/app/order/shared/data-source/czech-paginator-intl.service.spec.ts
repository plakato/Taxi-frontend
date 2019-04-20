import { TestBed, inject } from '@angular/core/testing';

import { CzechPaginatorIntl } from './czech-paginator-intl.service';

describe('CzechPaginatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CzechPaginatorIntl]
    });
  });

  it('should be created', inject([CzechPaginatorIntl], (service: CzechPaginatorIntl) => {
    expect(service).toBeTruthy();
  }));
});
