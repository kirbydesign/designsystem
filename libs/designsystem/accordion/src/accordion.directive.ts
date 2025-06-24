import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { AccordionItemComponent } from './accordion-item.component';

@Directive({
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
  standalone: false,
})
export class AccordionDirective implements AfterContentInit, OnDestroy {
  @Input() headingLevel: number;
  @ContentChildren(AccordionItemComponent) accordionChildren: QueryList<AccordionItemComponent>;

  private childrenChangesSub?: Subscription;

  ngAfterContentInit(): void {
    this.setHeadingLevels();

    this.childrenChangesSub = this.accordionChildren.changes.subscribe(() => {
      this.setHeadingLevels();
    });
  }

  private setHeadingLevels(): void {
    if (this.accordionChildren) {
      this.accordionChildren.forEach((child) => {
        child.headingLevel = this.headingLevel;
      });
    }
  }

  ngOnDestroy(): void {
    this.childrenChangesSub?.unsubscribe();
  }
}
