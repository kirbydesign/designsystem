import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

const config = {
  selector: 'cookbook-item-example-disclosure-animation',
  template: `
  <kirby-card [hasPadding]="true" (click)="isExpanded = !isExpanded">
    <kirby-card-header [hasPadding]="false">
    <kirby-item disclosure="arrow-down" [rotateIcon]="isExpanded">
      <p class="kirby-text-bold">Disclosure animation example</p>
    </kirby-item>
  </kirby-card-header>

    <div [@isExpanded]="isExpanded">
      <p class="kirby-text-large">A card with animated disclosure icon</p>
      <p> 
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </kirby-card>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [':host {--kirby-card-padding-top: 0; --kirby-card-padding-bottom: 0;}'],
  animations: [
    trigger('isExpanded', [
      state('true', style({ height: '*', visibility: 'visible' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('0.2s')),
    ]),
  ],
})
export class ItemExampleDisclosureAnimationComponent {
  template: string = config.template;

  isExpanded = false;
}
