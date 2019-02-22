import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number;

  constructor() { }

  ngOnInit() {
    this.progress = 0;
  }

  columnNumberForProgressBar(): string {
    let number = "*";
    for (let index = 0; index < 99; index++) {
      number += ", *";
    }
    return number;
  }

}
