import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-custom-button-example',
  template: `<kirby-menu [title]="'Title'" [subtitle]="'This is a message where we can put absolutely anything we want.'">
  <button
    kirby-button
    type="button"
    [isFloating]="true"
  >
    <kirby-icon [name]="'add'"></kirby-icon>
  </button>
  <kirby-item [selectable]="true">
  <h3>Action 1</h3>
</kirby-item>
<kirby-divider></kirby-divider>
<kirby-item [selectable]="true">
  <h3>Action 2</h3>
</kirby-item>
<kirby-divider></kirby-divider>
<kirby-item [selectable]="true">
  <h3>Action 3 lorem ipsum something wow yes</h3>
</kirby-item>
<kirby-divider></kirby-divider>
<kirby-item [selectable]="true">
  <h3>Action 4</h3>
</kirby-item>
<kirby-divider></kirby-divider>
<kirby-item [selectable]="true">
  <h3>Action 5</h3>
</kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuCustomButtonExampleComponent {
  template: string = config.template;

  public actionClicked(): void {
    console.log('Action clicked');
  }

  public toggled(): void {
    console.log('Toggle changed');
  }
}
