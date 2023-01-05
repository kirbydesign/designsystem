import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
})
export class AccordionDirective {}
