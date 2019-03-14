import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-card-designer',
  templateUrl: './card-designer.component.html',
  styleUrls: ['./card-designer.component.scss'],
})
export class CardDesignerComponent implements OnInit {
  public showCardBackground = true;
  public dimCardBackground = false;
  public hideCardForeground = false;

  constructor() {}

  ngOnInit() {}
}
