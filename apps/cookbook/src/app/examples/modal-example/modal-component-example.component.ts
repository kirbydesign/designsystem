import { ChangeDetectionStrategy, Component } from '@angular/core';

const config = {
  selector: 'cookbook-modal-component-example',
  template: `<button kirby-button size="lg" id="open-modal">Show modal</button>

<kirby-modal trigger="open-modal">

  <ng-template>
    <kirby-page-title>Modal Component</kirby-page-title>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
    </p>


    <kirby-modal-footer>
      <button kirby-button>Button in footer</button>
    </kirby-modal-footer>
  </ng-template>
</kirby-modal>
`,
};
@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-component-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponentExampleComponent {
  static readonly template = config.template;
}
