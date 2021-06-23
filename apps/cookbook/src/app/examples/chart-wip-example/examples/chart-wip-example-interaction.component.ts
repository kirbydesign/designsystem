import { Component } from '@angular/core';
import { ActiveElement } from 'chart.js';

import { ChartWipOptions } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-chart-wip-example-interaction',
  template: `  <p>{{_text}}</p>
  <kirby-chart-wip 
    type="column" 
    [data]="[7, 12, 5, 9, 3]" 
    [dataLabels]="_dataLabels" 
    [customOptions]="_customOptions"
  ></kirby-chart-wip>`,
  codeSnippet: `
  _text = 'Nothing has been clicked';
  _dataLabels = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];

  _customOptions = {
    onClick: (_, [activeElement]) => this.onClickHandler(activeElement),
  };

  onClickHandler(activeElement) {
    if (!activeElement) {
      this._text = 'The background was clicked';
    } else {
      const activeElementLabel = this._dataLabels[activeElement.index];
      this._text = activeElementLabel + " was clicked";
    }
  }

  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleInteractionComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  _text: string = 'Nothing has been clicked';
  _dataLabels = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];

  _customOptions: ChartWipOptions = {
    onClick: (_, [activeElement]) => this.onClickHandler(activeElement),
  };

  onClickHandler(activeElement: ActiveElement) {
    if (!activeElement) {
      this._text = 'The background was clicked';
    } else {
      const activeElementLabel = this._dataLabels[activeElement.index];
      this._text = `${activeElementLabel} was clicked`;
    }
  }
}
