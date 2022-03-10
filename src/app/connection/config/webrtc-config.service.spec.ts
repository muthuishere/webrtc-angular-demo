import { TestBed } from '@angular/core/testing';

import { WebrtcConfigService } from './webrtc-config.service';

describe('WebrtcConfigService', () => {
  let service: WebrtcConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
