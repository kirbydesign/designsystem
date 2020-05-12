import { Component, OnInit } from '@angular/core';

import { ThemeColor } from './../../../../../../libs/designsystem/src/lib/helpers/theme-color.type';
@Component({
  selector: 'cookbook-circular-progress-example',
  templateUrl: './circular-progress-example.component.html',
  styleUrls: ['./circular-progress-example.component.scss'],
})
export class CircularProgressExampleComponent implements OnInit {
  progress: number = 0;
  themeColor: ThemeColor = 'primary';

  constructor() {}
  ngOnInit(): void {
    setInterval(() => this.updateProgress(), 1000);
  }

  private updateProgress = () => {
    this.progress = this.progress + 10;
    if (this.progress > 100) {
      this.progress = 0;
    }

    if (this.progress >= 100) {
      this.themeColor = 'success';
    } else if (this.progress > 40) {
      this.themeColor = 'warning';
    } else {
      this.themeColor = 'danger';
    }
  };
}
