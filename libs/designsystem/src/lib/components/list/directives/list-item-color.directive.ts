import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

import { ThemeColor } from '../../../helpers/theme-color.type';

@Directive({
  selector: '[kirbyListItemColor]',
})
export class ListItemColorDirective implements OnChanges {
  @Input()
  kirbyListItemColor: (item: any) => ThemeColor;
  @Input() item: any;
  @HostBinding('class')
  color: ThemeColor;

  ngOnChanges(): void {
    this.color = this.getColor();
  }

  private getColor(): ThemeColor {
    if (!this.kirbyListItemColor || !this.item) {
      return;
    }

    const themeColor = this.kirbyListItemColor(this.item);
    return themeColor;
  }
}
