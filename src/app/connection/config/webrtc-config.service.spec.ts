import { TestBed } from '@angular/core/testing';

import { WebrtcConnectorService } from './webrtc-connector.service';

describe('WebrtcConfigService', () => {
  let service: WebrtcConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
