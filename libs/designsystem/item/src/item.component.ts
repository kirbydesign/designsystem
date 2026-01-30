import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent } from '@kirbydesign/designsystem/radio';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { IonItem, IonReorder } from '@ionic/angular/standalone';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { IonicElementPartHelper } from '@kirbydesign/designsystem/helpers';

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
  providers: [IonicElementPartHelper],
  imports: [IonItem, IonReorder, IconComponent],
})
export class ItemComponent implements AfterViewInit {
  private _linkAttributesToForward = ['rel', 'target', 'download'];

  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected: boolean;
  @HostBinding('class.disclosure')
  @Input()
  disclosure: 'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null;

  private _selectable: boolean;
  get selectable(): boolean {
    return this._selectable;
  }

  @Input() set selectable(value: boolean) {
    this._selectable = value;
    this.cdr.markForCheck();
  }

  @Input()
  reorderable: boolean;
  @HostBinding('class')
  @Input()
  size: ItemSize | `${ItemSize}` = ItemSize.MD;

  @Input()
  href: string;

  @Input() rotateIcon: boolean = false;

  @ContentChild(CheckboxComponent, { static: false, read: ElementRef })
  private checkbox: ElementRef<HTMLElement>;
  @ContentChild(RadioComponent, { static: false, read: ElementRef })
  private radio: ElementRef<HTMLElement>;
  @ContentChild(ToggleComponent, { static: false, read: ElementRef })
  private toggle: ElementRef<HTMLElement>;
  @ContentChild(ButtonComponent, { static: false, read: ElementRef })
  private button: ElementRef<HTMLElement>;
  @ViewChild(IonItem, { static: true, read: ElementRef })
  private ionItem: ElementRef<HTMLIonItemElement>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private ionicElementPartHelper: IonicElementPartHelper
  ) {}

  ngAfterViewInit(): void {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._linkAttributesToForward,
      this.renderer,
      this.ionItem.nativeElement
    );
    this.ionicElementPartHelper.setPart('item-inner', this.ionItem, '.item-inner');
  }

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }

  get _renderButton(): boolean {
    // We shouldn't render item as a button if the item contains
    // nested interactive, i.e. checkbox, radio or toggle:

    return this.selectable && !this.containsNestedInteractives;
  }

  get _renderLink(): string {
    // We shouldn't render item as a link if the item contains
    // nested interactive, i.e. checkbox, radio or toggle:
    return this.containsNestedInteractives ? undefined : this.href;
  }

  @HostBinding('class.has-interactive')
  private get containsNestedInteractives(): boolean {
    return !!(this.checkbox || this.radio || this.toggle || this.button);
  }
}
