import { Component, OnInit } from '@angular/core';

import { GridCardConfiguration } from '@kirbydesign/designsystem';
import { CardExampleComponent } from '../card-example/card-example.component';

@Component({
  selector: 'cookbook-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss'],
})
export class GridExampleComponent implements OnInit {
  cardConfigurations: GridCardConfiguration[] = [];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.cardConfigurations = [
        new GridCardConfiguration(CardExampleComponent, 'Nr. 1', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 2', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 3', 2),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 4', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 5', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 6', 2),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 7', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 8', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 9', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 10', 2),
      ];
    }, 300);
  }
}
