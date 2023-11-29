import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-range-pin-example',
  template: `<kirby-range pin="true" minLabel="Min value" maxLabel="Max value" max="15" min="1"></kirby-range>`,
};

const pinFormatterExample = {
  template: `<kirby-range pin="true" [pinFormatter]="pinFormatter" minLabel="Min value" maxLabel="Max value" max="15" min="1"></kirby-range>`,
  function: `pinFormatter(value: number) {
  return \`\${value}%\`;
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangePinExampleComponent {
  template: string = config.template;
  pinFormatterFunction: string = pinFormatterExample.function;
  pinFormatterTemplate: string = pinFormatterExample.template;
}
