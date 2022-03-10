import { TestBed } from '@angular/core/testing';

import { WebrtcConnectionService } from '../connection/services/webrtc-connection.service';

describe('WebrtcService', () => {
  let service: WebrtcConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
