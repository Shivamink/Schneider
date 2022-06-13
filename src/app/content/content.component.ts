import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

const UID = '6a36faa6ed404bb6b6abc5d9d2d5213e';

declare const Sketchfab: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChild('iFrame') iFrame!: ElementRef;

  client: any;
  api: any;
  animationsList: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.client = new Sketchfab(this.iFrame.nativeElement);
    this.client.init(UID, {
      success: this.successHandler.bind(this),
      error: (err: any) => console.error('Viewer error', err),
      autostart: 1,
      preload: 1,
      transparent: 0,
      ui_animations: 0,
      ui_stop: 0,
      ui_inspector: 0,
      ui_help: 0,
      ui_settings: 0,
      ui_vr: 0,
      ui_fullscreen: 0,
      ui_annotations: 0,
      ui_watermark_link: 0,
      ui_infos: 0,
    });
  }

  successHandler(api: any) {
    this.api = api;

    this.api.start();
    this.api.addEventListener('viewerready', () => {
      this.api.getAnimations((err: any, animations: any[]) => {
        console.log({ animations });
        this.api = api;
        this.animationsList = animations;
      });
    });
  }

  setAnimation(i: any) {
    console.log('setAnimation(): ', i);
    if (!this.api) return;
    const uid = this.animationsList[i][0];
    this.api.setCurrentAnimationByUID(uid);
  }
}
