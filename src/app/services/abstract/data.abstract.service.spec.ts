import { TestBed } from '@angular/core/testing';

import { DataAbstractService } from './data.abstract.service';

describe('DataAbstractService', () => {
  let service: DataAbstractService<Object>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
