import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent implements OnChanges {
  @Input() route: string;
  @Input() text: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @HostBinding('class')
  get _cssSize() {
    return this.size;
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'link': {
            this.isExternal();
          }
        }
      }
    }
  }
  isExternal() {
    const baseURI = window.document.baseURI;
    return new URL(baseURI).origin === new URL(this.route, baseURI).origin;
  }
}
