import { TestBed } from '@angular/core/testing';

import { ProducsService } from './producs.service';

describe('ProducsService', () => {
  let service: ProducsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
