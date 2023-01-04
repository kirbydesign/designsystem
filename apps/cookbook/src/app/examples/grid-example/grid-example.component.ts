import { Component, OnInit } from '@angular/core';
import { GridCardConfiguration } from '@kirbydesign/designsystem';
import { CardExampleComponent } from '../card-example/card-example.component';

@Component({
  selector: 'cookbook-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss'],
})
export class GridExampleComponent implements OnInit {
  spacing = '';
  spacingSizes = [
    {
      text: '0',
      value: '0',
    },
    {
      text: '1',
      value: '1',
    },
    {
      text: '2',
      value: '2',
    },
    {
      text: '3',
      value: '3',
    },
    {
      text: '4',
      value: '4',
    },
    {
      text: '5',
      value: '5',
    },
  ];

  onSpacingSizeChange(value) {
    this.spacing = value;
  }

  cardConfigurations: GridCardConfiguration[] = [];

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
