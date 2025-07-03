import { AfterContentInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';

import { startWith } from 'rxjs';
import { AccordionItemComponent } from './accordion-item.component';

@Directive({
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
  standalone: false,
})
export class AccordionDirective implements AfterContentInit {
  @Input() headingLevel: number;
  @ContentChildren(AccordionItemComponent) accordionItems: QueryList<AccordionItemComponent>;

  ngAfterContentInit(): void {
    this.accordionItems.changes.pipe(startWith(0)).subscribe(() => {
      this.setHeadingLevels();
    });
  }

  private setHeadingLevels(): void {
    if (this.accordionItems && this.headingLevel) {
      this.accordionItems.forEach((child) => {
        child.headingLevel = this.headingLevel;
      });
    }
  }
}
