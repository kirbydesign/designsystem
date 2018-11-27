import { Component, OnInit } from '@angular/core';
import { GridCardConfiguration } from '../../../../kirby/components/grid/grid-card-configuration';
import { CardExampleComponent } from '../../card-example/card-example.component';

@Component({
  selector: 'kirby-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss']
})
export class GridExampleComponent implements OnInit {
  cardConfigurations: GridCardConfiguration[];

  constructor() {
    this.cardConfigurations = [
      new GridCardConfiguration(CardExampleComponent, null, 1),
      new GridCardConfiguration(CardExampleComponent, null, 2),
      new GridCardConfiguration(CardExampleComponent, null, 2),
      new GridCardConfiguration(CardExampleComponent, null, 1),
      new GridCardConfiguration(CardExampleComponent, null, 1),
      new GridCardConfiguration(CardExampleComponent, null, 2),
      new GridCardConfiguration(CardExampleComponent, null, 1),
      new GridCardConfiguration(CardExampleComponent, null, 2),
      new GridCardConfiguration(CardExampleComponent, null, 1)
    ];
  }

  ngOnInit() {
  }

}
