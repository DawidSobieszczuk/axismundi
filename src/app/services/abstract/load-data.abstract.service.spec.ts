import { TestBed } from '@angular/core/testing';

import { LoadDataAbstractService } from './load-data.abstract.service';

describe('LoadDataAbstractService', () => {
  let service: LoadDataAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDataAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
