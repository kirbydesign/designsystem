import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'kirby-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent implements OnInit {
  @Input() public isLoading = true;
  @Input() public showBackdrop = true;

  @ViewChild('overlayWrapperRef')
  wrapperGrid: ElementRef;

  constructor() {}

  ngOnInit() {}
}
