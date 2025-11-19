import { Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-grid-layout-single-container-example',
  templateUrl: './grid-layout-single-container-example.component.html',
  styleUrls: ['./grid-layout-single-container-example.component.scss'],
  imports: [CardComponent, ButtonComponent],
})
export class GridLayoutSingleContainerExampleComponent {}
