import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams, IRowNode, RowSelectedEvent } from 'ag-grid-community';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

@Component({
  selector: 'cookbook-kirby-checkbox-cell-renderer',
  imports: [CheckboxComponent],
  template: `
    <kirby-checkbox
      [checked]="checked"
      size="sm"
      (checkedChange)="onCheckedChange($event)"
    ></kirby-checkbox>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    `,
  ],
})
export class KirbyCheckboxCellRendererComponent implements ICellRendererAngularComp, OnDestroy {
  checked = false;

  private params!: ICellRendererParams;
  private destroyListener?: () => void;

  constructor(private cdr: ChangeDetectorRef) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.checked = params.node.isSelected() ?? false;
    this.addSelectionListener(params.node);
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.checked = params.node.isSelected() ?? false;
    return true;
  }

  onCheckedChange(checked: boolean): void {
    this.params.node.setSelected(checked);
  }

  ngOnDestroy(): void {
    this.destroyListener?.();
  }

  private addSelectionListener(node: IRowNode): void {
    this.destroyListener?.();
    const listener = (event: RowSelectedEvent) => {
      this.checked = event.node.isSelected() ?? false;
      this.cdr.markForCheck();
    };
    node.addEventListener('rowSelected', listener);
    this.destroyListener = () => node.removeEventListener('rowSelected', listener);
  }
}
