import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CardExampleComponent } from '../../examples/card-example/card-example.component';

@Component({
  selector: 'cookbook-card-designer',
  templateUrl: './card-designer.component.html',
  styleUrls: ['./card-designer.component.scss'],
  imports: [CardExampleComponent, NgClass],
})
export class CardDesignerComponent {
  public showCardBackground = true;
  public dimCardBackground = false;
  public hideCardForeground = false;
}
