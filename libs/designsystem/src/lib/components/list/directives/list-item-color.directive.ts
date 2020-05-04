import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

import { ThemeColor } from '../../../helpers/theme-color.type';

@Directive({
  selector: '[kirbyListItemColor]',
})
export class ListItemColorDirective implements OnChanges {
  @Input()
  kirbyListItemColor: (item: any) => ThemeColor;

  @Input() item: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.kirbyListItemColor || !this.item) {
      return;
    }

    const themeColor = this.kirbyListItemColor(this.item);
    this.renderer.addClass(this.elementRef.nativeElement, themeColor);
  }
}
