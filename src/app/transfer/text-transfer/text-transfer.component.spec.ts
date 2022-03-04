import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTransferComponent } from './text-transfer.component';

describe('TextTransferComponent', () => {
  let component: TextTransferComponent;
  let fixture: ComponentFixture<TextTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
