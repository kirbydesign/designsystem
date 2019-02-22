import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Label } from 'tns-core-modules/ui/label/label';

@Component({
  selector: 'kirby-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number;
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
