import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-events-example',
  template: `<kirby-checkbox (checkedChange)="checkedChange($event)" text="Toggle to see 'checkedChange' event in action"></kirby-checkbox>`,
  checkboxEventCodeSnippet: `checkedChange(checked: boolean) {
  alert(\`Checkbox checked change: \${checked}\`);
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class CheckboxEventsExampleComponent {
  template: string = config.template;
  checkboxEventCodeSnippet: string = config.checkboxEventCodeSnippet;

  checkedChange(checked: boolean) {
    alert(`Checkbox checked change: ${checked}`);
  }
}
