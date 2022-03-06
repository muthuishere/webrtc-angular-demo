import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferContainerComponent } from './transfer-container.component';

describe('TransferContainerComponent', () => {
  let component: TransferContainerComponent;
  let fixture: ComponentFixture<TransferContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
