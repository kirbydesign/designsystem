import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number | string;
  @Input() progressColor: string;
  @Input() backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

  columnNumberForProgressBar(): string {
    let number = "*";
    for (let index = 0; index < 99; index++) {
      number += ", *";
    }
    return number;
  }

}
