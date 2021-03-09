import { Component, OnInit } from '@angular/core';

const config = {
  selector: 'cookbook-radio-template-driven-forms-example',
  template: `
        <kirby-radio-group #group="ngModel" [(ngModel)]="selected" required>
            <kirby-item kirby-item *ngFor="let item of items" selectable="true">
                <kirby-radio [value]="item" slot="start"></kirby-radio>
                <kirby-label>{{item.title}}</kirby-label>
            </kirby-item>
        </kirby-radio-group>
        <fieldset>
            <legend>
                Configuration
            </legend>
            <button kirby-button
                    size="sm"
                    attentionLevel="2"
                    [disabled]="selected === null"
                    (click)="selected = null">
                Clear
            </button>
            <p class="selection">
                <b>
                    Selected:
                </b>
                {{selected | json}}
                <br/>
              <span [class.state-true]="group.valid"><b>valid:</b> {{ group.valid }}</span>
              <br/>
              <span ><b>errors:</b> {{ group.errors | json }}</span>
              <br/>
              <span [class.state-true]="group.enabled"><b>enabled:</b> {{ group.enabled }}</span>
              <br/>
              <span [class.state-true]="group.touched"><b>touched:</b> {{ group.touched }}</span>

            </p>
        </fieldset>
    `,
  styles: [
    `.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,
  ],
  codeSnippet: `
items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami', value: 2 },
  { title: 'Tenderloin', value: 3 },
  { title: 'Tongue', value: 4 },
  { title: 'Drumstick', value: 5 },
];
selected = null;`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
      }

      kirby-form-field:not(:last-of-type) {
        margin-right: 40px;
      }
    `,
  ],
})
export class RadioTemplateDrivenFormsExampleComponent implements OnInit {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  ngOnInit() {
    this.selected = this.items[1];
  }

  items = [
    { title: 'Bacon', value: 1 },
    { title: 'Salami', value: 2 },
    { title: 'Tenderloin', value: 3 },
    { title: 'Tongue', value: 4 },
    { title: 'Drumstick', value: 5 },
  ];
  selected = null;
}
