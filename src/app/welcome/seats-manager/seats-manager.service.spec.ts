import { TestBed, inject } from '@angular/core/testing';

import { SeatsManagerService } from './seats-manager.service';

describe('SeatsManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatsManagerService]
    });
  });

  it('should be created', inject([SeatsManagerService], (service: SeatsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
