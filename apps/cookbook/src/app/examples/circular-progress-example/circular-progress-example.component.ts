import { Component, OnInit } from '@angular/core';

import { ThemeColor } from './../../../../../../libs/designsystem/src/lib/helpers/theme-color.type';
@Component({
  selector: 'cookbook-circular-progress-example',
  templateUrl: './circular-progress-example.component.html',
  styleUrls: ['./circular-progress-example.component.scss'],
})
export class CircularProgressExampleComponent implements OnInit {
  progress: number = 0;
  themeColor: ThemeColor;

  constructor() {}
  ngOnInit(): void {
    setInterval(this.updateProgress, 2000);
  }

  private updateProgress = () => {
    this.progress = Math.random() * 100;

    if (this.progress > 66.666) {
      this.themeColor = 'success';
    } else if (this.progress > 33.333) {
      this.themeColor = 'warning';
    } else {
      this.themeColor = 'danger';
    }
  };
}
