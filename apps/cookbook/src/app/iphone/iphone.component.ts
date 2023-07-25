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

  @HostBinding('class')
  @Input()
  viewMode: 'device' | 'full-size';

  @Input() showViewModeToggle: boolean = false;

  @ViewChild('iframe', { read: ElementRef })
  iframe: ElementRef<HTMLIFrameElement>;

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
    if (this.viewMode === 'full-size') {
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

  onViewModeToggleChange(deviceMode: boolean) {
    this.viewMode = deviceMode ? 'device' : 'full-size';
    this.onIframeLoaded();
  }
}
