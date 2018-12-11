import { Component, OnInit, Input, ElementRef } from '@angular/core';
declare var ResizeObserver;

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  ro;
  sizes = {
    ['card-small']: 360,
    ['card-medium']: 720,
    ['card-large']: 1024
  };

  handleResize = (entries) => {
    for (const entry of entries) {
      for (const [size, width] of Object.entries(this.sizes)) {
        if (entry.contentRect.width >= width) {
          entry.target.classList.add(size);
        } else {
          entry.target.classList.remove(size);
        }
      }
    }
  }

  constructor(private elm: ElementRef) {
    this.ro = new ResizeObserver(this.handleResize);
  }

  ngOnInit() {
    this.ro.observe(this.elm.nativeElement);
  }
}
