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

import { IconComponent } from '../../icon/icon.component';
import { selectedTabClickEvent } from './tab-button.events';

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

  onClick(event: Event, isSelected: boolean) {
    this.click.emit(event);

    if (isSelected) {
      const clickEvent = new CustomEvent(selectedTabClickEvent);
      dispatchEvent(clickEvent);
    }
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const button = this.elementRef.nativeElement.childNodes[0];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, button);
  }
}
