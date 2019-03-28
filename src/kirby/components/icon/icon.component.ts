import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  static DEFAULT_ICON_CODE = 0xf2cf;
  static DEFAULT_ICON_NAME = 'cog';

  @Input() name:
    | String
    | 'add'
    | 'close'
    | 'cog'
    | 'swap'
    | 'move'
    | 'log-out'
    | 'more'
    | 'arrow-back'
    | 'help'
    | 'attach'
    | 'search'
    | 'checkbox-outline'
    | 'checkbox'
    | 'menu'
    | 'person' = IconComponent.DEFAULT_ICON_NAME;

  @Input() size: String | 'small' | 'large' = 'small';
  @Input() colorType: String | 'primary' | 'secondary' | 'tertiary' = 'primary';

  getIonicIconName(name: string): string {
    const icon = this.searchIcons(name);
    return icon !== undefined ? icon.name : IconComponent.DEFAULT_ICON_NAME;
  }

  getCharCode(name: string): string {
    const icon = this.searchIcons(name);
    return icon !== undefined
      ? String.fromCharCode(icon.code)
      : String.fromCharCode(IconComponent.DEFAULT_ICON_CODE);
  }

  private searchIcons(name: string): any {
    return icons.find((icon) => icon.name === name);
  }
}

export const icons = [
  { code: 0xf102, name: 'add' },
  { code: 0xf2c0, name: 'close' },
  { code: 0xf2cf, name: 'cog' },
  { code: 0xf389, name: 'swap' },
  { code: 0xf331, name: 'move' },
  { code: 0xf359, name: 'log-out' },
  { code: 0xf1c9, name: 'more' },
  { code: 0xf27d, name: 'arrow-back' },
  { code: 0xf30b, name: 'help' },
  { code: 0xf28e, name: 'attach' },
  { code: 0xf375, name: 'search' },
  { code: 0xf2b8, name: 'checkbox-outline' },
  { code: 0xf2b9, name: 'checkbox' },
  { code: 0xf32a, name: 'menu' },
  { code: 0xf345, name: 'person' },
];
