import { Component, OnInit } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';
import { DecimalPipe } from '@angular/common';

const config = {
  selector: 'cookbook-progress-circle-example-animated',
  template: `<kirby-progress-circle [themeColor]="themeColor" [value]="progress" size="lg">
  {{ progress | number: '1.1-1' }}%
</kirby-progress-circle>`,
  codeSnippet: `
progress: number = 0;
themeColor: ThemeColor;

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
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ProgressCircleComponent, DecimalPipe],
})
export class ProgressCircleExampleAnimatedComponent implements OnInit {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  progress: number = 0;
  themeColor: ThemeColor;

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
