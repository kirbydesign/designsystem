import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent {
  color: Color;
  colors: Color[] = ColorHelper.getMainColors();

  constructor(private router: RouterExtensions) {}

  changeColor(color: Color) {
    this.color = color;
  }

  backButtonSelected(): void {
    this.router.backToPreviousPage();
  }
}
