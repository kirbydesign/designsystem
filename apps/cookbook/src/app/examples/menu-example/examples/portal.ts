import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-portal-example',
  template: `<kirby-menu 
  [DOMPortalOutlet]="_outlet"
  >
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [MenuComponent, ItemModule],
})
export class MenuPortalExampleComponent {
  template: string = config.template;
  public _outlet: HTMLElement;

  /**
   *
   */
  constructor(private cd: ChangeDetectorRef) {}

  @Input() set isOutletElementSet(isSet: boolean) {
    this._outlet = isSet ? this.outletElement : null;
  }
  private outletTag: string = 'cookbook-root';

  public outletElement: HTMLElement = this.getOutletElement();

  private getOutletElement(): HTMLElement {
    const elements: HTMLCollectionOf<Element> = document.getElementsByTagName(this.outletTag);

    if (!elements || elements.length === 0) {
      throw Error(`Could not locate HTMLElement for ${this.outletTag}. Did you misspell it?`);
    }

    if (elements.length > 1) {
      throw Error(
        `Multiple HTMLElements found for ${this.outletTag}.
      This can lead to unintended behaviours. Provide an unique outlet`
      );
    }

    return elements[0] as HTMLElement;
  }
}
