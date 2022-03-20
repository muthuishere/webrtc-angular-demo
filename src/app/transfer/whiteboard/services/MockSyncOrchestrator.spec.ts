import {getTwoConnectedServices} from './MockSyncOrchestrator';
import {fakeAsync, tick} from '@angular/core/testing';


describe('Mock SyncOrchestrator ', () => {

  it('should return two Sync Service', fakeAsync(() => {
    const [first, second] = getTwoConnectedServices();
    expect(first).toBeDefined();
    expect(second).toBeDefined();


  }));
  it('first observable to be emitted to second one ', fakeAsync(() => {
    const [first, second] = getTwoConnectedServices();

    let result=null;
    second.getReceiver().subscribe(
      (data) => {
        result = data;
      }
    );
    first.send('halo');

    tick();
    expect(result).toBe('halo');

  }));
  it('second observable to be emitted to first one ', fakeAsync(() => {
    const [first, second] = getTwoConnectedServices();

    let result=null;
    first.getReceiver().subscribe(
      (data) => {
        result = data;
      }
    );
    second.send('halo');

    tick();
    expect(result).toBe('halo');

  }));


});
