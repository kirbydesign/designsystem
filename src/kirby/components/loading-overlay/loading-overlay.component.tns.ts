import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/ui/page/page';
import { LayoutBase, View } from 'tns-core-modules/ui/layouts/layout-base';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kirby-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent implements OnInit, AfterViewInit {
  private isLoadingSubject = new BehaviorSubject(false);

  private _isLoading: boolean;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  @Input()
  public set isLoading(v: boolean) {
    this._isLoading = v;
    this.isLoadingSubject.next(v);
  }

  @Input() public showBackdrop = true;

  @ViewChild('overlayWrapperRef')
  wrapperGrid: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.isLoadingSubject.subscribe((isLoading) => {
      this.setControlInteractionState(<View>this.wrapperGrid.nativeElement, !isLoading);
    });
  }

  // recursively enable/disable interactions for controls as Android is not blocking tap events on overlay
  // https://stackoverflow.com/questions/40988124/nativescript-disable-all-controls-while-activityindicator-is-shown/42331788#42331788
  setControlInteractionState(view: View, isEnabled: boolean): void {
    debugger;
    view.isUserInteractionEnabled = isEnabled;
    if (isAndroid) {
      if (view.android instanceof android.widget.EditText) {
        let control = <android.widget.EditText>view.android;
        control.setCursorVisible(isEnabled);
      }
    }
    if (view instanceof LayoutBase) {
      let layoutBase = <LayoutBase>view;
      for (let i = 0, length = layoutBase.getChildrenCount(); i < length; i++) {
        let child = layoutBase.getChildAt(i);
        this.setControlInteractionState(child, isEnabled);
      }
    }
  }
}
