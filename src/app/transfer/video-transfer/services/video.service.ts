import {ElementRef, Inject, Injectable, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  private currentWindow: any;
  private getUserMedia: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.currentWindow = this.document.defaultView;
    const nav = this.currentWindow.navigator;
    // this.getUserMedia  = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia;
    this.getUserMedia= (nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia).bind(this.currentWindow.navigator);

    // this.getUserMedia = this.currentWindow.navigator.mediaDevices.getUserMedia;

  }

  public setStream(element,stream) {
    element.srcObject = stream;
  }
  public getLocalVideoStream(){
    return new Promise((resolve, reject) => {
      const mediaConstraints = {
        video: true,
        audio: false
      };
      this.currentWindow.navigator.getUserMedia(mediaConstraints,
        resolve,reject);


    });
  }
}
