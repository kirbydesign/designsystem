import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyToolbarStart]',
})
export class ToolbarStartElementDirective {}

@Directive({
  selector: '[kirbyToolbarEnd]',
})
export class ToolbarEndElementDirective {}
