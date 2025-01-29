import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-grid-layout-extended-example',
  templateUrl: './grid-layout-extended-example.component.html',
  styleUrls: ['./grid-layout-extended-example.component.scss'],
  imports: [CardModule, ButtonComponent],
})
export class GridLayoutExtendedExampleComponent {}
