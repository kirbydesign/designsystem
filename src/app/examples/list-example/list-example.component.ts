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

  myItemsList = [
    {title: 'Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225},
    {title: 'A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: -354},
    {title: 'Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171}
  ];

  myItemsList1 = [
    {title: '111111 Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225},
    {title: '111111 A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: -354},
    {title: '111111 Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171}
  ];

  myItemsList2 = [
    {title: '222222 Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225},
    {title: '222222 A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: -354},
    {title: '22222 Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171}
  ];

  mySections = [
    {
      sectionTitle: 'Fredag 2. November',
      items: this.myItemsList,
    }
    ,
    {
      sectionTitle: 'Torsdag 1. November',
      items: this.myItemsList1,
    }
    ,
    {
      sectionTitle: 'Onsdag 31. Oktober',
      items: this.myItemsList2,
    }
  ];



  constructor() { }

  ngOnInit() {
  }

  onClick(row) {
    alert(`You have clicked the row [${row.title} ${row.amount}]`);
  }

}
