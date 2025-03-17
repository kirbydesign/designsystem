import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[kirbyAttributes]',
})
export class AttributesDirective implements OnChanges {
  _attributes: Record<string, any> = {};
  @Input() kirbyAttributes: Record<string, any>;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.resetAttributes();
    this._attributes = this.kirbyAttributes;
    Object.keys(this.kirbyAttributes).forEach((key) => {
      this.el.nativeElement.setAttribute(key, this.kirbyAttributes[key]);
    });
  }

  private resetAttributes() {
    Object.keys(this._attributes).forEach((key) => {
      this.el.nativeElement.removeAttribute(key);
    });
  }
}
