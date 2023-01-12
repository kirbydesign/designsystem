import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';

// Counter for generating unique element ids
let uniqueId = 0;

@Component({
  standalone: true,
  imports: [IconModule],
  selector: 'kirby-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('isExpanded', [
      state('true', style({ height: '*', visibility: 'visible' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('0.2s')),
    ]),
  ],
})
export class AccordionItemComponent implements OnChanges {
  @Input() title: string;
  @Input() isExpanded: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() disabledTitle: string;

  ngOnChanges(): void {
    if (this.isDisabled) {
      this.isExpanded = false;
    }
  }

  getTitle() {
    if (this.isDisabled && !!this.disabledTitle) {
      return this.disabledTitle;
    } else {
      return this.title;
    }
  }

  _onToggleExpanded(event: KeyboardEvent) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded && !this.isDisabled;
  }

  // IDs used for a11y labelling
  _titleId = `kirby-accordion-item-title-${++uniqueId}`;
  _contentId = `kirby-accordion-item-content-${uniqueId}`;
}
