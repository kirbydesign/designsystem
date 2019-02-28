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

}
