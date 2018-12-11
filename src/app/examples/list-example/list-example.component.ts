import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent implements OnInit {

  myItems = [
    {text: 'Rema1000', amount: 1002.34},
    {text: 'Føtex', amount: 20},
    {text: 'Brugsen', amount: 78455468.76}
  ];

  constructor() { }

  ngOnInit() {
  }

}
