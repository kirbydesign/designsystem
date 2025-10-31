import { Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-grid-layout-multiple-containers-example',
  templateUrl: './grid-layout-multiple-containers-example.component.html',
  styleUrls: ['./grid-layout-multiple-containers-example.component.scss'],
  imports: [CardComponent, ButtonComponent],
})
export class GridLayoutMultipleContainersExampleComponent {}
