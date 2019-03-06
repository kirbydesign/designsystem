import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number;
  @Input() progressColor: string;
  @Input() backgroundColor: string;

  constructor() {}

  ngOnInit() {
    if (this.progress < 0) {
      this.progress = 0;
    } else if (this.progress > 100) {
      this.progress = 100;
    }
  }
}
