import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss']
})
export class StickyNoteComponent implements OnInit {

  position: { x: number, y: number } = { x: 0, y: 0 };

  @Input()
  data={
    title: 'Awesome title',
    description: 'The years, sometimes by accident, sometimes on purpose (injected humour and the like).',

    //e: {x: 246, y: 198}
    tilePosition: {x: 246, y: 198}
  };
  constructor() { }

  ngOnInit(): void {
  this.updatePosition(this.data.tilePosition);

  }

  onMovementChanged($event: any) {
    console.log($event);
  }

  onTitleChange(innerHTML: any) {
    console.log(innerHTML);
  }

  onValueChange(innerHTML: any) {
    console.log(innerHTML);
  }

  private updatePosition(position: { x: number; y: number }) {
    this.position = { x: this.position.x + position.x, y: this.position.y + position.y };
  }
}
