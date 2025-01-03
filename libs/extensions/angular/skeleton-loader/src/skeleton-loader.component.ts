import { CommonModule, NgClass } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import {
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const { borderRadius } = DesignTokenHelper;

type SkeletonLoaderTheme = 'light' | 'dark';
type BorderRadii = 'xxs' | 'xs' | 's' | 'n' | 'l' | 'xl' | 'circle' | 'pill';

@Component({
  selector: 'kirby-x-skeleton-loader',
  standalone: true,
  imports: [
    CardModule,
    ButtonComponent,
    IconModule,
    NgClass,
    CommonModule,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonList,
    IonThumbnail,
  ],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss',
})
export class SkeletonLoaderComponent {
  /**
   * The theme.
   */
  @HostBinding('class')
  @Input()
  theme: SkeletonLoaderTheme = 'light';

  /**
   * The border radius.
   */
  @HostBinding('style.border-radius')
  _borderRadius: BorderRadii = 'xxs';
  @Input() set borderRadius(value: BorderRadii) {
    this._borderRadius = borderRadius(value) as BorderRadii;
  }

  /**
   * The height.
   */
  @HostBinding('style.height')
  private _height: string = '16px';
  @Input() set height(value: string | number) {
    this._height = typeof value === 'number' ? `${value}px` : value;
  }

  /**
   * The width.
   */
  @HostBinding('style.width')
  private _width: string = '100px';
  @Input()
  set width(value: string | number) {
    this._width = typeof value === 'number' ? `${value}px` : value;
  }
}
