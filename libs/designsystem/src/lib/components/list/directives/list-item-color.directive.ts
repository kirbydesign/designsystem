import { Directive, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

import { ThemeColor } from '../../../helpers/theme-color.type';

@Directive({
  selector: '[kirbyListItemColor]',
})
export class ListItemColorDirective implements OnChanges {
  @Input()
  kirbyListItemColor: (item: any) => ThemeColor;

  @Input() item: any;

  @HostBinding('class')
  elementClass: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.kirbyListItemColor || !this.item) {
      return;
    }

    const themeColor = this.kirbyListItemColor(this.item);
    this.elementClass = themeColor;
  }
}
