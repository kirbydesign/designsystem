import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss'],
})
export class GridExampleComponent {
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
}
