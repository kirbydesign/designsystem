import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent implements OnInit {

  // myItems = [
  //   {title: 'Netflix', amount: -79.95, detail: 'Peter'},
  //   {title: 'McDonnalds Århus', amount: -20, detail: 'Jack'},
  //   {title: 'Super Brugsen', amount: -180.65, detail: 'Morten'}
  // ];

  myItems = [
    {title: 'Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225},
    {title: 'A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: -354},
    {title: 'Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171}
  ];

  constructor() { }

  ngOnInit() {
  }

  onClick(row) {
    alert(`You have clicked the row [${row.title} ${row.amount}]`);
  }

  onShouldRenderSectionHeader(currentItem: any, items: any[], index: number): boolean {
    return index > 0;
  }

  getSectionTitle(item: any): string {
    return 'Your dynamic section title';
  }
}
