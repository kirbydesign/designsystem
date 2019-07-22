import { Component, OnInit, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';

@Component({
  selector: 'kirby-chip-example',
  templateUrl: './chip-example.component.html',
  styleUrls: ['./chip-example.component.scss'],
})
export class ChipExampleComponent implements OnInit {
  constructor() {}
  @Input() themeColor: ThemeColor | '' = '';
  ngOnInit() {}
}
