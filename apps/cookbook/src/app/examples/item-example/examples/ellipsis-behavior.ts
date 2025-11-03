import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { AvatarComponent, IconModule } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-item-example-ellipsis-behavior',
  template: `<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <kirby-label direction="horizontal">  
        <kirby-label >
            <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p> 
        </kirby-label>
        <kirby-label >
            <data class="kirby-item-detail" slot="end">22.86%</data> 
        </kirby-label>    
    </kirby-label>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
    </kirby-label>
</kirby-item>

<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <kirby-label direction="horizontal">
      <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
      <data class="kirby-item-detail">22.86%</data> 
    </kirby-label>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
  </kirby-label>
</kirby-item>

<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
    <kirby-label>
        <kirby-label direction="horizontal">
            <p class="kirby-item-title" slot="start">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
            <data class="kirby-item-detail" slot="end">22.86%</data> 
        </kirby-label>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
        </kirby-label>
</kirby-item>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemModule, IconModule, BadgeComponent, AvatarComponent],
})
export class ItemExampleEllipsisBehaviorComponent {
  template: string = config.template;
}
