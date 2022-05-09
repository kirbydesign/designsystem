import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @HostBinding('class')
  @Input()
  type: 'inline' | 'fixed' = 'fixed';

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const { nativeElement } = this.element;
    const modalWrapper = nativeElement.closest('kirby-modal-wrapper');
    if (modalWrapper) {
      modalWrapper.appendChild(nativeElement);
    }
  }

  ngOnDestroy() {
    this.element.nativeElement.remove();
  }
}
