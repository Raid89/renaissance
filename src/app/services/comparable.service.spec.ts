import { TestBed } from '@angular/core/testing';

import { ComparableService } from './comparable.service';

describe('ComparableService', () => {
  let service: ComparableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
