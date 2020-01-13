import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';

@Component({
  selector: 'kirby-chip-example',
  templateUrl: './chip-example.component.html',
  styleUrls: ['./chip-example.component.scss'],
})
export class ChipExampleComponent {
  activeTab = 'default';
  @Input() themeColor: ThemeColor | '' = '';

  onSegmentSelect(segment) {
    this.activeTab = segment.id;
  }
}
