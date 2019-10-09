import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IonTabButton } from '@ionic/angular';

import { IconComponent } from '@kirbydesign/designsystem/components/icon/icon.component';

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent implements OnInit, AfterViewInit {
  @Input() routerLink: string;
  @ContentChild(IconComponent) iconRef: IconComponent;
  @ViewChild(IonTabButton) tabButton: IonTabButton;

  private _icon: string;

  // Set outline if not selected
  get icon(): string {
    if (!this.tabButton.selected && this._icon) {
      return `${this._icon}-outline`;
    } else {
      return this._icon;
    }
  }
  // Strip outline from icon
  set icon(path: string) {
    if (path.endsWith('-outline')) {
      this._icon = path.replace('-outline', '');
    } else {
      this._icon = path;
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  ngAfterViewInit(): void {
    // Using of interval because there's no hook to know when selected tab isset.
    const interval = setInterval(() => {
      if (this.tabButton.selected !== undefined) {
        console.log(this.tabButton.selected);
        this.icon = this.iconRef.icon.name;
        clearInterval(interval);
      }
    }, 5000);
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const button = this.elementRef.nativeElement.childNodes[0];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, button);
  }
}
