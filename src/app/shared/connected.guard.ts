import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate, CanActivateChild {

  config$;

  constructor(private router: Router, private store: Store<{ config: any }>) {

    this.config$ = this.store.select('config');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateUrl();
  }

  private validateUrl(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const invalidUrl = this.router.createUrlTree(['/connect'], {
      queryParams: {
        param: true,
      }
    });

    return this.config$
      .pipe(
        map(({connected}) => {
          return connected ? true : invalidUrl;
        })
      );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateUrl();
  }

}
