import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyAccordion]',
  exportAs: 'kirby-accordion',
})
export class AccordionDirective {}
