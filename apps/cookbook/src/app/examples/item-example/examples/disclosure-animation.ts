import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-disclosure-animation',
  template: `<kirby-card [hasPadding]="true" (click)="isExpanded = !isExpanded">
  <kirby-card-header [hasPadding]="false">
    <kirby-item disclosure="arrow-down" [rotateIcon]="isExpanded">
      <p class="kirby-text-normal-bold">Disclosure animation example</p>
    </kirby-item>
  </kirby-card-header>

  <div [@isExpanded]="isExpanded">
    <p class="kirby-text-bold">A card with animated disclosure icon</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</kirby-card>`,
  animationCodeSnippetTS: `import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  ...
  animations: [
    trigger('isExpanded', [
      state('true', style({ height: '*', visibility: 'visible' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('0.2s')),
    ]),
  ],
})
export class MyComponent {  
  isExpanded = false;
}`,
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
  imports: [CardModule, ItemModule],
})
export class ItemExampleDisclosureAnimationComponent {
  template: string = config.template;
  animationCodeSnippetTS: string = config.animationCodeSnippetTS;

  isExpanded = false;
}
