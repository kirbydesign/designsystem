import { Component, HostBinding, Input } from '@angular/core';

export enum TextLinkSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
}

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent {
  @Input() route: string;
  @Input() text: string;
  @Input() target: '_self' | '_blank' | '_parent' | '_top' = '_blank';
  @HostBinding('class')
  @Input()
  size: TextLinkSize = TextLinkSize.MD;

  get isInternal() {
    const baseURI = window.document.baseURI;
    return new URL(baseURI).origin === new URL(this.route, baseURI).origin;
  }
}
