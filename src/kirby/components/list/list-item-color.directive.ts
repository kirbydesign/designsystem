import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[kirbyListItemColor]',
})
export class ListItemColorDirective implements OnChanges {
  @Input()
  colorCb: (item: any) => string;

  @Input() item: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.colorCb || !this.item) {
      return;
    }

    const color = this.colorCb(this.item);
    this.renderer.addClass(this.elementRef.nativeElement, color);
  }
}
