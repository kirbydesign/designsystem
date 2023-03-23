import { ChangeDetectorRef, Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-menu-portal-example',
  template: `<kirby-menu 
  [DOMPortalOutlet]="_outlet"
  >
  <kirby-item [selectable]="true">
    <h3>Action 1</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>Action 2</h3>
  </kirby-item>
</kirby-menu>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuPortalExampleComponent {
  template: string = config.template;
  private _outlet: HTMLElement;

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
