import { TestBed } from '@angular/core/testing';

import { MockSignallingServerService } from './mock-signalling-server.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MockSignallingServerService', () => {
  let service: MockSignallingServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClientModule],
      imports: [ HttpClientModule ],

    });
    service = TestBed.inject(MockSignallingServerService);
  });

  it('Answers can be used', async () => {
    await service.putAnswer('test');
    console.log("completed")
    const res = await service.waitAndgetAnswer();
    expect(res).toBe('test');
  });
  it('offers can be used', async () => {
    await service.putOffer('testoffers');
    console.log("completed")
    const res = await service.waitAndgetOffer();
    expect(res).toBe('testoffers');
  });
  it('offer should wait till offer has value', async () => {
    service.defaultTimeOut=100;
    setTimeout(() => {
      service.putOffer('testoffers');
    }, 400);

    console.log("completed")
    const res = await service.waitAndgetOffer();
    expect(res).toBe('testoffers');
  });
});
