import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-icon',
  },
})
export class IconComponent {
  static DEFAULT_ICON_CODE = 0xf2cf;
  static DEFAULT_ICON_NAME: 'cog' = 'cog';

  @Input() name:
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

  getIonicIconName(name: string): string {
    const icon = iconsCharCodeMap[name];
    return icon !== undefined ? name : IconComponent.DEFAULT_ICON_NAME;
  }

  getCharCode(name: string): string {
    const icon = iconsCharCodeMap[name];
    return icon !== undefined
      ? String.fromCharCode(icon)
      : String.fromCharCode(IconComponent.DEFAULT_ICON_CODE);
  }
}
// tslint:disable:prettier
export const iconsCharCodeMap = {
  'add': 0xf102,
  'close': 0xf2c0,
  'cog': 0xf2cf,
  'swap': 0xf389,
  'move': 0xf331,
  'log-out': 0xf359,
  'more': 0xf1c9,
  'arrow-back': 0xf27d,
  'arrow-forward': 0xf287,
  'help': 0xf30b,
  'attach': 0xf28e,
  'search': 0xf375,
  'checkbox-outline': 0xf2b8,
  'checkbox': 0xf2b9,
  'menu': 0xf32a,
  'person': 0xf345,
};
// tslint:enable:prettier
