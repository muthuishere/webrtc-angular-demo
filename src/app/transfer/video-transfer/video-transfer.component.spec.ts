import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTransferComponent } from './video-transfer.component';

describe('VideoTransferComponent', () => {
  let component: VideoTransferComponent;
  let fixture: ComponentFixture<VideoTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
