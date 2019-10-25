import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'kirby-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input() slot?: 'start' | 'end' | 'title';
  @Input() truncate: boolean = true;
  @Input() expand: boolean = false;

  position: 'stacked' | '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
    this.isStacking();
  }

  private isStacking() {
    const previousSibling = this.elementRef.nativeElement.previousElementSibling;
    this.position =
      previousSibling.tagName.toLocaleLowerCase() === 'kirby-label' &&
      previousSibling.getAttribute('expand') !== null
        ? 'stacked'
        : '';
  }

  private removeWrapper(): void {
    const parent = this.elementRef.nativeElement.parentNode;
    const label = this.elementRef.nativeElement.childNodes[0];

    if (label && parent) {
      this.renderer.removeChild(parent, this.elementRef.nativeElement);
      this.renderer.appendChild(parent, label);
    }
  }
}
