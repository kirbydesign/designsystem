import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-accordion',
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {}
