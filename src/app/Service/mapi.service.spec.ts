import { TestBed } from '@angular/core/testing';

import { MApiService } from './mapi.service';

describe('MApiService', () => {
  let service: MApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
