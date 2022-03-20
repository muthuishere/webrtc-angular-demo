import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserPositionComponent } from './other-user-position.component';

describe('OtherUserPositionComponent', () => {
  let component: OtherUserPositionComponent;
  let fixture: ComponentFixture<OtherUserPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUserPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
