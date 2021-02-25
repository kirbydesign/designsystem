import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-bar-2',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>
  <kirby-chart-2 
    type="bar"
    label="Bar"
    [backgroundColor]="red"
    [categories]="categories"   
    [data]="adjustedMonthlyExpenseData"
    >
  </kirby-chart-2>
 
</kirby-card>`,

  codeSnippet: ``,
};

//  [options]="monthlyOverviewOptions"

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleBar2Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 150;
  categories = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  private monthlyExpenseData = [1250, 600, 0, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200];
  private selectedIdx = 0;

  // lower limit is shown as 2% of max value for UX reasons
  private lowerLimit = Math.max(...this.monthlyExpenseData) * 0.02;

  public adjustedMonthlyExpenseData = this.monthlyExpenseData.map((data) =>
    this.lowerLimit >= data ? this.lowerLimit : data
  );
}
