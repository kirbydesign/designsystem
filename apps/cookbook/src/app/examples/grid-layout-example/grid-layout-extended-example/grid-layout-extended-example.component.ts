import { Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-grid-layout-extended-example',
  templateUrl: './grid-layout-extended-example.component.html',
  styleUrls: ['./grid-layout-extended-example.component.scss'],
  imports: [CardComponent, ButtonComponent],
})
export class GridLayoutExtendedExampleComponent {}
