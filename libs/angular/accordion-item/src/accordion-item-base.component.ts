// This file is temporary until the list component is also converted to a lit element and this base component can be removed.
import { AfterContentInit, ContentChildren, Directive, OnChanges, QueryList } from '@angular/core';
import { ListComponent } from '@kirbydesign/designsystem/list';

@Directive()
export abstract class KirbyAccordionItemBaseComponent implements AfterContentInit, OnChanges {
  @ContentChildren(ListComponent) listChildren: QueryList<ListComponent> | undefined;

  private _isExpanded = false;

  get isExpanded(): boolean {
    return this._isExpanded;
  }
  set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  private _hasPadding = true;
  get hasPadding(): boolean {
    return this._hasPadding;
  }
  set hasPadding(value: boolean) {
    this._hasPadding = value;
  }

  private _isDisabled = false;
  get isDisabled(): boolean {
    return this._isDisabled;
  }
  set isDisabled(value: boolean) {
    this._isDisabled = value;
  }

  ngAfterContentInit(): void {
    if (this.listChildren && this.listChildren.length > 0) {
      this.hasPadding = false;
      this.listChildren.forEach((child) => {
        child.shape = 'none';
      });
    }
  }

  ngOnChanges(): void {
    if (this.isDisabled) {
      this.isExpanded = false;
    }
  }
}
