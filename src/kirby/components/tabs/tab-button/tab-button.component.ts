import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  QueryList,
  ContentChildren,
} from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/components/icon/icon.component';

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent implements OnInit {
  @Input() routerLink: string;
  @Output() click = new EventEmitter<Event>();
  @ContentChildren(IconComponent) icons: QueryList<IconComponent>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  onClick(event: Event) {
    this.click.emit(event);
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const button = this.elementRef.nativeElement.childNodes[0];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, button);
  }
}
