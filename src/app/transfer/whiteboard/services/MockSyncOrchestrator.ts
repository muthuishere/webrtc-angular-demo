import {SyncService} from './sync-service';
import {tap} from 'rxjs/operators';


function merge(source: SyncService, destinations: SyncService[]) {
  source.getSender().pipe(
    tap(msg => {
      destinations.forEach(dest => dest.receiver.next(msg));

    })).subscribe();
}

export function getTwoConnectedServices(): [SyncService, SyncService] {
  const service1 = new SyncService();
  const service2 = new SyncService();

  merge(service2, [service1]);
  merge(service1, [service2]);

  return [service1, service2];

}


