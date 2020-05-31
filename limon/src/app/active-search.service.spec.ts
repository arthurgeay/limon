import { TestBed } from '@angular/core/testing';

import { ActiveSearchService } from './active-search.service';

describe('ActiveSearchService', () => {
  let service: ActiveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
