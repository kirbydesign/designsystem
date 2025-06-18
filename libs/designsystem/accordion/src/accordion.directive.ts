import { AfterContentInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component'; // Adjust path as needed

@Directive({
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
  standalone: false,
})
export class AccordionDirective implements AfterContentInit {
  @Input() headingLevel: number;
  @Input() role: string;
  @ContentChildren(AccordionItemComponent) listChildren: QueryList<AccordionItemComponent>;

  ngAfterContentInit(): void {
    if (this.listChildren) {
      this.listChildren.forEach((child) => {
        child.headingLevel = this.headingLevel;
      });
    }
  }
}
