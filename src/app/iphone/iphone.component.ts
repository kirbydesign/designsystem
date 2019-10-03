import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
})
export class IphoneComponent implements OnChanges, AfterViewInit {
  @Input() src: string;
  trustedSrc: SafeResourceUrl;

  @ViewChild('iframe', { read: ElementRef }) iframe: ElementRef;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      this.trustedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(changes.src.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.onload = () => this.onIframeLoaded();
  }

  onIframeLoaded() {
    let document = this.iframe.nativeElement.contentWindow.document;
    let ngComponent = document.getElementsByTagName('ng-component')[0];
    ngComponent.style.setProperty('--ion-safe-area-top', '20px');
    this.renderer.addClass(ngComponent, 'ion-page');

    const backgroundColor = ColorHelper.getBackgroundColor().hex;
    this.renderer.setStyle(ngComponent, 'background', backgroundColor);
  }
}
