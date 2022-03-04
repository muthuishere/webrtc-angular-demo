import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  links;
  constructor(private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.url);
    this.links=[
      {label:'Connect',path:'/connect'},
      {label:'Transfer Text',path:'/transfer/text'},

    ]
  }
  //
  // isActive(instruction: any[]): boolean {
  //   return this.router.isRouteActive(this.router.generate(instruction));
  // }
}
