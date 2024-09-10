import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { selectedTabClickEvent } from './tab-button.events';

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent {
  @Input() tab: string;
  @Output() click = new EventEmitter<Event>();
  @ContentChildren(IconComponent) icons: QueryList<IconComponent>;

  onClick(event: Event, isSelected: boolean) {
    this.click.emit(event);

    if (isSelected) {
      const clickEvent = new CustomEvent(selectedTabClickEvent);
      dispatchEvent(clickEvent);
    }
  }
}
