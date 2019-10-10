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

interface TabButtonIcon {
  default: string;
  outlined: string;
}

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent implements OnInit, AfterViewInit {
  @Input() routerLink: string;
  @ContentChild(IconComponent) iconRef: IconComponent;
  @ViewChild(IonTabButton) tabButton: IonTabButton;

  icon: TabButtonIcon;
  customIcon: TabButtonIcon;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  ngAfterViewInit(): void {
    this.setIcon(this.iconRef);
  }

  private setIcon(iconRef: IconComponent) {
    const defaultIcon = String(iconRef.name || iconRef.customName).replace('-outline', '');
    const icon: TabButtonIcon = {
      default: defaultIcon,
      outlined: `${defaultIcon}-outline`,
    };

    if (iconRef.name) {
      this.icon = icon;
    } else if (iconRef.customName) {
      this.customIcon = icon;
    }
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const button = this.elementRef.nativeElement.childNodes[0];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, button);
  }
}
