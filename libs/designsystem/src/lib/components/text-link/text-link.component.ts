import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent implements OnChanges {
  @Input() route: string;
  @Input() text: string;
  @HostBinding('class')
  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'link': {
            this.isInternal();
          }
        }
      }
    }
  }
  isInternal() {
    const baseURI = window.document.baseURI;
    return new URL(baseURI).origin === new URL(this.route, baseURI).origin;
  }
}
