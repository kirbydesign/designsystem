import { Component } from '@angular/core';
import { noop } from 'rxjs';

const config = {
  selector: 'cookbook-card-example-disclosure',
  template: `<kirby-card hasPadding="true" (click)="noop()">
  <kirby-card-header [hasPadding]="false">
    <kirby-item [disclosure]="'arrow-more'">
      <h3 class="kirby-text-bold">Item disclosure in header</h3>
    </kirby-item>
  </kirby-card-header>

  <p class="kirby-text-large">A card with state and disclosure</p>
  <p> 
    Note how this card can be focussed with tab keyboard navigation and enter or space triggers the click function.
  </p>
  <p>
    You are free to slot any content inside. 
    <kirby-flag themeColor="danger" style="float: right"> Danger </kirby-flag>
  </p>
  <p>
    Could be a couple of flags! 
    <kirby-flag themeColor="success" style="float: right"> Success </kirby-flag>
  </p>
</kirby-card>`,
  style: `kirby-card {
   --kirby-card-padding-top: 0px;   
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
  styles: [config.style],
})
export class CardExampleDisclosureComponent {
  template: string = config.template;
  style: string = config.style;
  noop: () => void = noop;
}
