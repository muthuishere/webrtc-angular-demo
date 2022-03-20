import { TestBed } from '@angular/core/testing';

import { WebrtcCreatorService } from '../connection/services/webrtc-creator.service';

describe('WebrtcService', () => {
  let service: WebrtcCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
