import { Component } from '@angular/core';
import { ActiveElement, Chart, ChartEvent } from 'chart.js';

import { ChartOptions } from '@kirbydesign/designsystem';
import { ChartHighlightedElements } from '@kirbydesign/designsystem/components/chart-wip/chart-wip.types';

const config = {
  selector: 'cookbook-chart-wip-example-interaction',
  template: `  <p>{{_text}}</p>
  <kirby-chart-wip 
    type="column" 
    [data]="[7, 12, 5, 9, 3]" 
    [dataLabels]="_dataLabels" 
    [customOptions]="_customOptions"
    [highlightedElements]="_highlighted"
  ></kirby-chart-wip>`,
  codeSnippet: `
  _text = 'Nothing has been clicked';
  _dataLabels = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];
  _highlighted: ChartHighlightedElements;

  _customOptions = {
    onClick: (_, [activeElement]) => this.onClickHandler(activeElement),
  };

  onClickHandler(activeElement) {
    if (!activeElement) {
      this._text = 'The background was clicked';
      this._highlighted = [];
    } else {
      this._highlighted = [[activeElement.datasetIndex, activeElement.index]];
      const activeElementLabel = this._dataLabels[activeElement.index];
      this._text = \`\${activeElementLabel\} was clicked\`;
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
  _highlighted: ChartHighlightedElements;

  _customOptions: ChartOptions = {
    onClick: (event, [activeElement], chart) => this.onClickHandler(event, activeElement, chart),
  };

  onClickHandler(_event: ChartEvent, activeElement: ActiveElement, _chart: Chart) {
    if (!activeElement) {
      this._text = 'The background was clicked';
      this._highlighted = [];
    } else {
      this._highlighted = [[activeElement.datasetIndex, activeElement.index]];
      const activeElementLabel = this._dataLabels[activeElement.index];
      this._text = `${activeElementLabel} was clicked`;
    }
  }
}
