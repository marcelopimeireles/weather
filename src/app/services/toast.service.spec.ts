import { TestBed } from '@angular/core/testing';

import { Toast.ServiceService } from './toast.service.service';

describe('Toast.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Toast.ServiceService = TestBed.get(Toast.ServiceService);
    expect(service).toBeTruthy();
  });
});
