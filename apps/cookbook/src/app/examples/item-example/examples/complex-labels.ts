import { Component } from '@angular/core';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { AvatarComponent, IconComponent } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-item-example-complex-labels',
  template: `<kirby-item>
  <kirby-badge slot="outside" themeColor="danger" size="sm"></kirby-badge>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png"></kirby-avatar>
   <kirby-label>
     <kirby-label direction="horizontal">
      <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
      <p class="kirby-item-time-disclosure">
        <time>20.12.2017</time><kirby-icon name="arrow-more"></kirby-icon>
      </p>
    </kirby-label>
      <p class="kirby-item-subtitle">Subtitle will wrap if necessary in two lines and truncate with ellipsis if it overflows.</p>
      <p class="kirby-item-detail kirby-item-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
   </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemComponent, IconComponent, BadgeComponent, AvatarComponent, LabelComponent],
})
export class ItemExampleComplexLabelsComponent {
  template: string = config.template;
}
