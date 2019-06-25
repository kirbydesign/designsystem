import { Input, HostBinding, Directive } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `kirby-card[themeColor],
             kirby-badge[themeColor],
             kirby-icon[themeColor]`,
})
export class ThemeColorDirective {
  @HostBinding('class.default')
  private isDefault = true;
  @HostBinding('class.primary')
  private isPrimary: boolean;
  @HostBinding('class.secondary')
  private isSecondary: boolean;
  @HostBinding('class.tertiary')
  private isTertiary: boolean;
  @HostBinding('class.success')
  private isSuccess: boolean;
  @HostBinding('class.warning')
  private isWarning: boolean;
  @HostBinding('class.danger')
  private isDanger: boolean;
  @HostBinding('class.light')
  private isLight: boolean;
  @HostBinding('class.medium')
  private isMedium: boolean;
  @HostBinding('class.dark')
  private isDark: boolean;
  @Input() set themeColor(value: ThemeColor) {
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
  }
}
