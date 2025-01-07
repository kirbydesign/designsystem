import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

class ChipDirectiveContext<T> {
  constructor(public $implicit: T) {}
}

@Directive({
  selector: '[chip]',
  standalone: true,
})
export class ChipDirective<T = unknown> {
  private readonly _templateRef = inject<TemplateRef<ChipDirectiveContext<T>>>(TemplateRef);
  private readonly _vcr = inject(ViewContainerRef);

  @Input()
  public set chip(value: unknown) {
    this._vcr.clear();
    this._vcr.createEmbeddedView(this._templateRef, new ChipDirectiveContext(value));
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
   *   <ng-container *chip="let item; source: items">
   *     {{ item }} <!-- item is strongly typed -->
   *   </ng-container>
   * </app-autocomplete>
   * ```
   *
   */
  @Input()
  public chipSource: T[] = [];

  static ngTemplateContextGuard<T>(
    _dir: ChipDirective<T>,
    ctx: unknown
  ): ctx is ChipDirectiveContext<T> {
    return true;
  }
}
