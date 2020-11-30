import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Counter for generating unique element ids
let uniqueId = 0;

@Component({
  selector: 'kirby-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() title: string;

  isExpanded: boolean = false;

  // IDs used for a11y labelling
  _titleId = `kirby-accordion-title-${++uniqueId}`;
  _contentId = `kirby-accordion-content-${uniqueId}`;
}
