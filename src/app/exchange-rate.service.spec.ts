import { TestBed } from '@angular/core/testing';

import { ExchangeRatesService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
