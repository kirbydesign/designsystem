import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[kirbyAttributes]',
})
export class AttributesDirective implements OnChanges {
  private existingAttributes: Record<string, any> = {};
  @Input() kirbyAttributes: Record<string, any>;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (!this.attributesChanged()) {
      return;
    }

    this.resetAttributes();
    this.existingAttributes = this.kirbyAttributes;
    Object.keys(this.kirbyAttributes).forEach((key) => {
      this.el.nativeElement.setAttribute(key, this.kirbyAttributes[key]);
    });
  }

  private resetAttributes() {
    Object.keys(this.existingAttributes).forEach((key) => {
      this.el.nativeElement.removeAttribute(key);
    });
  }

  private attributesChanged(): boolean {
    const keys1 = Object.keys(this.existingAttributes);
    const keys2 = Object.keys(this.kirbyAttributes);

    if (keys1.length !== keys2.length) {
      return true;
    }

    return keys1.some((key) => this.existingAttributes[key] !== this.kirbyAttributes[key]);
  }
}
