import { TestBed } from '@angular/core/testing';

import { SalepointService } from './salepoint.service';

describe('SalepointService', () => {
  let service: SalepointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalepointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
