import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent {
  @Input() route: string;
  @Input() text: string;
  @HostBinding('class')
  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  get isInternal() {
    const baseURI = window.document.baseURI;
    return new URL(baseURI).origin === new URL(this.route, baseURI).origin;
  }
}
