import {
  AfterViewInit,
  Component,
  ElementRef,
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
  trustedSrc: SafeResourceUrl;

  @ViewChild('iframe', { read: ElementRef, static: true }) iframe: ElementRef<HTMLIFrameElement>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      this.trustedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(changes.src.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.onload = () => this.onIframeLoaded();
  }

  onIframeLoaded() {
    const document = this.iframe.nativeElement.contentWindow.document.documentElement;
    document.style.setProperty('--ion-safe-area-top', '20px');
    document.style.setProperty('--ion-safe-area-bottom', '22px');
  }
}
