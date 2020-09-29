import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToggleButtonComponent } from '../toggle-button.component';

@Directive({
  selector: '[kirbyToggleButtonShowWhen]',
})
export class ToggleButtonShowWhenDirective implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private hasView: boolean;
  @Input('kirbyToggleButtonShowWhen') showWhen: boolean;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private toggleButtonComponent: ToggleButtonComponent
  ) {}

  ngOnInit(): void {
    this.toggleButtonComponent.checked$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((checked) => {
        this.show(checked);
      });
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private show(checked: boolean) {
    if (checked === this.showWhen && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
