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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.isStacking();
  }

  private isStacking() {
    const previousSibling = this.elementRef.nativeElement.previousElementSibling;
    this.position =
      previousSibling &&
      previousSibling.tagName.toLocaleLowerCase() === 'kirby-label' &&
      previousSibling.getAttribute('expand') !== null
        ? 'stacked'
        : '';
  }
}
