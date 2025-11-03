import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-ellipsis-behavior',
  template: `
<kirby-item>
    <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
    <data class="kirby-item-detail" slot="end">22.86%</data> 
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
  imports: [ItemModule],
})
export class ItemExampleEllipsisBehaviorComponent {
  template: string = config.template;
}
