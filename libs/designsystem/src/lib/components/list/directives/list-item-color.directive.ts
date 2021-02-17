import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

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

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
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
