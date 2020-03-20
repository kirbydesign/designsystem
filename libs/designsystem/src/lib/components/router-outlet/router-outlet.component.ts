import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'kirby-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.scss'],
})
export class RouterOutletComponent {
  @Input() main: boolean;
  get nativeEl() {
    return this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef) {}
}
