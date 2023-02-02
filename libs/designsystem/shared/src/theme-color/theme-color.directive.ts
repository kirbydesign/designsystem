import { Directive, HostBinding, Input } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ThemeColor } from '@kirbydesign/core';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `kirby-avatar[themeColor],
             kirby-card[themeColor],
             kirby-icon[themeColor],
             kirby-progress-circle-ring[themeColor],
             kirby-modal-footer[themeColor],
             kirby-empty-state[themeColor]`,
})
export class ThemeColorDirective {
  private _isDefault = true;
  @HostBinding('class.default')
  get isDefault() {
    return this._isDefault;
  }

  private _isPrimary: boolean;
  @HostBinding('class.primary')
  get isPrimary() {
    return this._isPrimary;
  }

  private _isSecondary: boolean;
  @HostBinding('class.secondary')
  get isSecondary() {
    return this._isSecondary;
  }

  private _isTertiary: boolean;
  @HostBinding('class.tertiary')
  get isTertiary() {
    return this._isTertiary;
  }

  private _isSuccess: boolean;
  @HostBinding('class.success')
  get isSuccess() {
    return this._isSuccess;
  }

  private _isWarning: boolean;
  @HostBinding('class.warning')
  get isWarning() {
    return this._isWarning;
  }

  private _isDanger: boolean;
  @HostBinding('class.danger')
  get isDanger() {
    return this._isDanger;
  }

  private _isLight: boolean;
  @HostBinding('class.light')
  get isLight() {
    return this._isLight;
  }

  private _isMedium: boolean;
  @HostBinding('class.medium')
  get isMedium() {
    return this._isMedium;
  }

  private _isDark: boolean;
  @HostBinding('class.dark')
  get isDark() {
    return this._isDark;
  }

  private _isWhite: boolean;
  @HostBinding('class.white')
  get isWhite() {
    return this._isWhite;
  }

  private _isBrightnessWhite: boolean;
  @HostBinding('class.kirby-color-brightness-white')
  get isBrightnessWhite() {
    return this._isBrightnessWhite;
  }

  private _isBrightnessLight: boolean;
  @HostBinding('class.kirby-color-brightness-light')
  get isBrightnessLight() {
    return this._isBrightnessLight;
  }

  private _isBrightnessDark: boolean;
  @HostBinding('class.kirby-color-brightness-dark')
  get isBrightnessDark() {
    return this._isBrightnessDark;
  }

  @Input() set themeColor(value: ThemeColor) {
    this._isDefault = !value;
    this._isPrimary = value === 'primary';
    this._isSecondary = value === 'secondary';
    this._isTertiary = value === 'tertiary';
    this._isSuccess = value === 'success';
    this._isWarning = value === 'warning';
    this._isDanger = value === 'danger';
    this._isLight = value === 'light';
    this._isMedium = value === 'medium';
    this._isDark = value === 'dark';
    this._isWhite = value === 'white';
    const colorBrightness = ColorHelper.getColorBrightness(value);
    this._isBrightnessWhite = colorBrightness === 'white';
    this._isBrightnessLight = colorBrightness === 'light';
    this._isBrightnessDark = colorBrightness === 'dark';
  }
}
