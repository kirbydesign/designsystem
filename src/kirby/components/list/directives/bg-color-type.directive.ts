import { Directive, HostBinding, Input } from '@angular/core';


import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';
import { ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Directive({
  selector: `kirby-list-cell[bgColorType],
             kirby-list-item[bgColorType]`,
})
export class BgColorTypeDirective {
  @HostBinding('class.bg-default')
  private isDefault = true;
  @HostBinding('class.bg-primary')
  private isPrimary: boolean;
  @HostBinding('class.bg-secondary')
  private isSecondary: boolean;
  @HostBinding('class.bg-tertiary')
  private isTertiary: boolean;
  @HostBinding('class.bg-success')
  private isSuccess: boolean;
  @HostBinding('class.bg-warning')
  private isWarning: boolean;
  @HostBinding('class.bg-danger')
  private isDanger: boolean;
  @HostBinding('class.bg-light')
  private isLight: boolean;
  @HostBinding('class.bg-medium')
  private isMedium: boolean;
  @HostBinding('class.bg-dark')
  private isDark: boolean;
  @HostBinding('class.bg-kirby-color-brightness-white')
  private isBrightnessWhite: boolean;
  @HostBinding('class.bg-kirby-color-brightness-light')
  private isBrightnessLight: boolean;
  @HostBinding('class.bg-kirby-color-brightness-dark')
  private isBrightnessDark: boolean;
  @Input() set bgColorType(value: ThemeColor) {
    this.isDefault = !value;
    this.isPrimary = value === 'primary';
    this.isSecondary = value === 'secondary';
    this.isTertiary = value === 'tertiary';
    this.isSuccess = value === 'success';
    this.isWarning = value === 'warning';
    this.isDanger = value === 'danger';
    this.isLight = value === 'light';
    this.isMedium = value === 'medium';
    this.isDark = value === 'dark';
    const colorBrightness = ColorHelper.getColorBrightness(value);
    this.isBrightnessWhite = colorBrightness === 'white';
    this.isBrightnessLight = colorBrightness === 'light';
    this.isBrightnessDark = colorBrightness === 'dark';
  }
}
