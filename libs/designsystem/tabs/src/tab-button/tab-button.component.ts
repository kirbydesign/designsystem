import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { selectedTabClickEvent } from './tab-button.events';

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent implements OnInit {
  /**
   * @deprecated Using routerLink for defining routes for kirby-tab-button is deprecated,
   * as it clashes with Angulars builtin routerLink directive and causes unexpected behavior in Angular 16
   * and above, causing the tab stack to not be preserved. Use the tab input instead, as a direct replacement.
   */
  @Input() routerLink: string;
  @Input() tab: string;
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
