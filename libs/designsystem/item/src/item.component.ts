import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent } from '@kirbydesign/designsystem/radio';

import { LabelComponent } from './label/label.component';

export enum ItemSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
}

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements AfterContentInit {
  constructor(private renderer: Renderer2) {}

  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected: boolean;
  @HostBinding('class.disclosure')
  @Input()
  disclosure: 'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null;
  @Input() selectable: boolean;

  @Input()
  reorderable: boolean;
  @HostBinding('class')
  @Input()
  size: ItemSize | `${ItemSize}` = ItemSize.MD;

  @Input() rotateIcon: boolean = false;

  // Only query for label as direct child of item:
  @ContentChild(LabelComponent, { static: false, read: ElementRef, descendants: false })
  private label: ElementRef<HTMLElement>;
  @ContentChild(CheckboxComponent, { static: false })
  private checkboxComponent: CheckboxComponent;
  @ContentChild(RadioComponent, { static: false, read: ElementRef })
  private radio: ElementRef<HTMLElement>;
  @ContentChild(RadioComponent, { static: false })
  private radioComponent: RadioComponent;

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }

  ngAfterContentInit(): void {
    if (this.label) {
      if (this.radio && !this.radioComponent._ariaLabel) {
        this.moveLabel(this.radio.nativeElement.querySelector('ion-radio'));
      }
    }
  }

  private moveLabel(newParent: HTMLElement) {
    const labelElement = this.label.nativeElement;
    this.renderer.removeChild(labelElement.parentElement, labelElement);
    this.renderer.appendChild(newParent, labelElement);
  }

  get _isIonicButton() {
    // Ionic checks for slotted checkbox and radio
    // and we shouldn't set the `button` prop in that scenario:
    return this.selectable && !(this.checkboxComponent || this.radio);
  }
}
