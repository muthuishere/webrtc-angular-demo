import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleWhiteboardComponent } from './double-whiteboard.component';

describe('DoubleWhiteboardComponent', () => {
  let component: DoubleWhiteboardComponent;
  let fixture: ComponentFixture<DoubleWhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleWhiteboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
