import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent implements OnInit {

  myItems = [
    {text: 'Rema1000', amount: 1002.34, detail: 'Peter'},
    {text: 'Føtex', amount: 20, detail: 'Jack'},
    {text: 'Brugsen', amount: 78455468.76, detail: 'Morten'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
