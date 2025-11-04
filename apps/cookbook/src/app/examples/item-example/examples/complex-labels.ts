import { Component } from '@angular/core';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { AvatarComponent, IconComponent } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-item-example-complex-labels',
  template: `<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <kirby-label direction="horizontal">
      <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
      <time class="kirby-item-detail">20.12.2017</time>
    </kirby-label>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
  </kirby-label>
</kirby-item>
<kirby-item>
    <kirby-label direction="horizontal">
        <p class="kirby-item-title" >Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
        <data class="kirby-item-detail">22.86%</data> 
    </kirby-label>
</kirby-item>
`,
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
