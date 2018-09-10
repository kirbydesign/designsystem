import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'kirby-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'designsystem';
  readonly progress: Observable<number>;
  readonly progressSlow: Observable<number>;

  constructor() {
    this.progress = this.mockCircleProgressFast();
    this.progressSlow = this.mockCircleProgressSlow();
  }

  ngOnInit() {
  }

  mockCircleProgressFast() {
    return new Observable<number>(observer => {
      let value = 0;
      const interval = setInterval(() => {
        if (value < 100) {
          value++;
        } else {
          value = 0;
        }

        observer.next(value);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    });
  }

  mockCircleProgressSlow() {
    return new Observable<number>(observer => {
      let value = 0;
      const interval = setInterval(() => {
        if (value < 100) {
          value++;
        } else {
          value = 0;
        }

        observer.next(value);
      }, 500);

      return () => {
        clearInterval(interval);
      };
    });
  }
}
