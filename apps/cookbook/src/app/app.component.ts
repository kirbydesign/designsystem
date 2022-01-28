import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'cookbook-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  items: any;
  maxScrollBarLength: number;

  ngAfterViewInit() {
    this.maxScrollBarLength = this.items.length * 56;
    window.addEventListener('ionScroll', (event: any) => {
      if (event.detail.scrollTop / this.maxScrollBarLength > 0.75) {
        console.log('loading!');
        this.items = this.generateItems(this.items.length + 500);
        this.maxScrollBarLength = this.items.length * 56;
      }
    });
  }

  generateItems(n: number) {
    return [...Array(n).keys()].map((idx) =>
      idx % 10 === 0
        ? {
            type: 'header',
            content: `Section Header ${idx / 10}`,
          }
        : {
            type: 'item',
            content: `Item ${idx % 10}`,
          }
    );
  }

  constructor() {
    this.items = this.generateItems(500);
  }

  title = 'Kirby design system';
}
