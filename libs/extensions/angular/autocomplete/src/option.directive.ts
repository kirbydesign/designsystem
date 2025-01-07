import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

class OptionDirectiveContext<T> {
  constructor(public $implicit: T) {}
}

@Directive({
  selector: '[option]',
  standalone: true,
})
export class OptionDirective<T = unknown> {
  private readonly _templateRef = inject<TemplateRef<OptionDirectiveContext<T>>>(TemplateRef);
  private readonly _vcr = inject(ViewContainerRef);

  @Input()
  public set option(value: unknown) {
    this._vcr.clear();
    this._vcr.createEmbeddedView(this._templateRef, new OptionDirectiveContext(value));
  }

  /**
   * Workaround for strongly typed `$implicit` parameter in template
   *
   * @see https://github.com/angular/components/issues/22290#issuecomment-802981442
   *
   * @usage
   *
   * ```html
   * <app-autocomplete [items]="items">
   *   <ng-container *option="let item; source: items">
   *     {{ item }} <!-- item is strongly typed -->
   *   </ng-container>
   * </app-autocomplete>
   * ```
   */
  @Input()
  public optionSource: T[] = [];

  static ngTemplateContextGuard<T>(
    _dir: OptionDirective<T>,
    ctx: unknown
  ): ctx is OptionDirectiveContext<T> {
    return true;
  }
}
