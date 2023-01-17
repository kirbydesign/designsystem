import { Component } from '@angular/core';
import { noop } from 'rxjs';
const config = {
  template: `<kirby-card hasPadding="true" (click)="noop()">
  <kirby-card-header *ngIf="true" [title]="title" [subtitle]="subtitle" [hasPadding]="false"
    ><kirby-item [disclosure]="'arrow-down'">
      <h3 class="kirby-text-bold">Item disclosure in header</h3>
    </kirby-item></kirby-card-header>

  <!-- Card content example: -->
  <div class="card-content">
    <h2><b>Example content (with custom css properties)</b></h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae
      necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo accusamus cumque,
      in quia itaque cupiditate ratione repellat!
    </p>
  </div>
  <p style="margin-bottom: 8px">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    <kirby-flag slot="end" themeColor="danger" style="float: right"> Danger </kirby-flag>
  </p>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    <kirby-flag slot="end" themeColor="success" style="float: right"> Success </kirby-flag>
  </p>
</kirby-card>
`,
  selector: 'cookbook-card-with-item-header-example',
  style: `kirby-card {
 --kirby-card-padding-top: 0px;   
}
`,
};
@Component({
  selector: config.selector,
  templateUrl: './card-with-item-header-example.component.html',
  styles: [config.style],
})
export class CardWithItemHeaderExampleComponent {
  style: string = config.style;
  template: string = config.template;
  noop: () => void = noop;
}
