import { TestBed, inject } from '@angular/core/testing';
import { TablesManagerService } from './tables-manager.service';


describe('SeatsManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablesManagerService]
    });
  });

  it('should be created', inject([TablesManagerService], (service: TablesManagerService) => {
    expect(service).toBeTruthy();
  }));
});
