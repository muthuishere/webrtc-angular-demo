import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  authLinks = [
    {label: 'Transfer Text', path: '/transfer/text'},

  ];
  nonAuthLinks = [
    {label: 'Create Connection', path: '/connect'},
    {label: 'Join a Connection', path: '/join'},
  ];

  links$: Observable<any>;


  constructor(private router: Router, private store: Store<{ config: any }>) {

    const linksBasedOnConnection = (connected) => connected ? this.authLinks : this.nonAuthLinks;

    this.links$ = store.select('config').pipe(
      map(config => config.connected),
      map(linksBasedOnConnection),
    );


  }

  ngOnInit(): void {


  }

  //
  // isActive(instruction: any[]): boolean {
  //   return this.router.isRouteActive(this.router.generate(instruction));
  // }
}
