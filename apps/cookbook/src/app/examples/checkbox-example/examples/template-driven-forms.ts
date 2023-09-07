import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-template-driven-forms-example',
  template: `<kirby-checkbox
    #form="ngModel"
    [(ngModel)]="isChecked"
    name="isChecked"
    text="Template Driven"
    [disabled]="!canSelectFavorite"
  ></kirby-checkbox>
 <fieldset class="checkbox-xs">
    <legend>Configuration</legend>
    <kirby-checkbox
      [checked]="canSelectFavorite"
      (click)="toggleCanSelectFavorite()"
      text="Form field enabled">
    </kirby-checkbox>

    <section class="form-state">
      <h4>Form state:</h4>
      <p>
        <strong>Value:</strong>
        {{ form.value | json }}
        <br />
        <span [class.state-true]="form.valid">valid: {{ form.valid }}</span>
        <span [class.state-true]="form.enabled">enabled: {{ form.enabled }}</span>
        <span [class.state-true]="form.touched">touched: {{ form.touched }}</span>
      </p>
    </section>
  </fieldset>
`,
  codeSnippet: `isChecked = false;
canSelectFavorite = true;`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./ng-forms.shared.scss'],
})
export class CheckboxTemplateDrivenFormsExampleComponent {
  template: string = config.template.split('<fieldset>')[0];
  codeSnippet: string = config.codeSnippet;
  isChecked = false;
  canSelectFavorite = true;

  toggleCanSelectFavorite() {
    this.canSelectFavorite = !this.canSelectFavorite;
  }
}
