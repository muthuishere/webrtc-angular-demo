import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SyncService} from './services/sync-service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit, OnDestroy {


  destroyer = new Subject();


  @Input()
  public syncService: SyncService;

  notes: any[] = [];
  rules = {};

  onAddNote = (note: any) => {
    console.log('onAddNote', note, this);
  };

  constructor() {
    this.rules = {
      'addNote': this.onAddNote,
    };

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.handleEvents(this.rules);
  }


  public handleEvents(rules) {

    this.syncService.getReceiver().pipe(
      takeUntil(this.destroyer),
    ).subscribe(({action, data}) => {
      if (rules[action]) {
        rules[action](data);
      }
    });
  }

  ngOnDestroy() {
    this.destroyer.next();
    this.destroyer.complete();
  }


  hashCode(input) {


    const parsedString = JSON.stringify(input);
    let result = 0;
    for (let i = 0; i < parsedString.length; i++) {
      result = Math.imul(31, result) + parsedString.charCodeAt(i) | 0;
    }

    return result;
  }
}
