import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'cookbook-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
})
export class IphoneComponent implements OnChanges, AfterViewInit {
  @Input() src: string;
  @Input() showExternalLink: boolean;

  @Input()
  set showViewToggleWithDefault(value: 'phone' | 'full-size') {
    this._mode = value;
  }

  @ViewChild('iframe', { read: ElementRef }) iframe: ElementRef<HTMLIFrameElement>;

  @HostBinding('class')
  _mode: string;

  trustedSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private locationStrategy: LocationStrategy) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      this.trustedSrc = this.createTrustedSrc(changes.src.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.onload = () => this.onIframeLoaded();
  }

  onIframeLoaded() {
    const document = this.iframe.nativeElement.contentWindow.document.documentElement;
    if (this._mode === 'full-size') {
      document.style.setProperty('--ion-safe-area-top', '0px');
      document.style.setProperty('--ion-safe-area-bottom', '0px');
    } else {
      document.style.setProperty('--ion-safe-area-top', '20px');
      document.style.setProperty('--ion-safe-area-bottom', '22px');
    }
  }

  createTrustedSrc(unstrustedSrc: string) {
    const src =
      this.locationStrategy instanceof HashLocationStrategy ? `#${unstrustedSrc}` : unstrustedSrc;
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  onIframeOnlyToggleChange(shouldShowFullsize: boolean) {
    this._mode = shouldShowFullsize ? 'full-size' : 'phone';
    this.onIframeLoaded();
  }
}
