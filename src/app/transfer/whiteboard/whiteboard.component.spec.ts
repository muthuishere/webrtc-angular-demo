import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardComponent } from './whiteboard.component';

describe('WhiteboardComponent', () => {
  let component: WhiteboardComponent;
  // let fixture: ComponentFixture<WhiteboardComponent>;

  beforeEach(async () => {
    // await TestBed.configureTestingModule({
    //   declarations: [ WhiteboardComponent ]
    // })
    // .compileComponents();
    component = new WhiteboardComponent();
  });



  it('clicking Add Sheet should create sheet', () => {
    const notes = component.notes;
    component.addStickyNote();

    expect(component.notes.length).toBe(notes.length + 1);

  });
});
