import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
  standalone: false,
})
export class AccordionDirective {}
