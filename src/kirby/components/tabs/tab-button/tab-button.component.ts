import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: '[kirby-tab-button]',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent implements OnInit {
  @Input() tab: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.removeWrapper();
  }

  removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const tabButton = this.elementRef.nativeElement.childNodes[0];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, tabButton);
  }
}
