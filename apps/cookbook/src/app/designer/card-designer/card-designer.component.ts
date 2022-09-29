import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-card-designer',
  templateUrl: './card-designer.component.html',
  styleUrls: ['./card-designer.component.scss'],
})
export class CardDesignerComponent {
  public showCardBackground = true;
  public dimCardBackground = false;
  public hideCardForeground = false;
}
