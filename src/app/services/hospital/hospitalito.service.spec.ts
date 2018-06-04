import { TestBed, inject } from '@angular/core/testing';

import { HospitalitoService } from './hospitalito.service';

describe('HospitalitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HospitalitoService]
    });
  });

  it('should be created', inject([HospitalitoService], (service: HospitalitoService) => {
    expect(service).toBeTruthy();
  }));
});
