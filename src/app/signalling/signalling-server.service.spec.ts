import { TestBed } from '@angular/core/testing';

import { SignallingServerService } from './signalling-server.service';

describe('SignallingServerService', () => {
  let service: SignallingServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignallingServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
