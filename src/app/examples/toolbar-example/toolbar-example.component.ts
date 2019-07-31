import { Component, OnInit } from '@angular/core';

import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent {
  color: Color;
  colors: Color[] = ColorHelper.getMainColors();

  changeColor(color: Color) {
    this.color = color;
    console.log('color: ', color.name);
  }

  backButtonSelected(): void {
    alert('backbutton clicked!');
  }
}
