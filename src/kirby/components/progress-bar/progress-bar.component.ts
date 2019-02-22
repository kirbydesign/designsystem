import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("cols: ", this.columnNumberForProgressBar());
  }

  columnNumberForProgressBar(): string {
    let number = "*";
    for (let index = 0; index < 99; index++) {
      number += ", *";
    }
    return number;
  }

}
