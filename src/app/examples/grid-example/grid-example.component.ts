import { Component, OnInit } from '@angular/core';
import { GridCardConfiguration } from '../../../kirby/components/grid/grid-card-configuration';
import { CardExampleComponent } from '../card-example/card-example.component';
import {timer} from 'rxjs';

@Component({
  selector: 'kirby-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss']
})
export class GridExampleComponent implements OnInit {
  cardConfigurations: GridCardConfiguration[] = [];

  constructor() {

  }

  ngOnInit() {
    const source = timer(300);
    source.subscribe(val => {
      this.cardConfigurations = [
        new GridCardConfiguration(CardExampleComponent, 'Nr. 1', 2),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 2', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 3', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 4', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 5', 2),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 6', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 7', 1),
        new GridCardConfiguration(CardExampleComponent, 'Nr. 8', 2),
      ];
    });
  }
}

