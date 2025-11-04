import { animate, AUTO_STYLE, style, transition, trigger } from '@angular/animations';

export const DropDownAnimation = trigger('dropDownMenu', [
  transition(':enter', [
    style({ height: 0, overflow: 'hidden' }),
    animate('300ms ease', style({ height: AUTO_STYLE })),
  ]),

  transition(':leave', [
    style({ height: AUTO_STYLE, overflow: 'hidden' }),
    animate('300ms ease', style({ height: 0 })),
  ]),
]);
