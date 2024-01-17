import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActionSheetComponent } from '@kirbydesign/designsystem/modal';
import { IonBackdrop, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [CommonModule, IonBackdrop, IonFab, IonFabButton, IonFabList],
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSheetComponent implements AfterContentInit, AfterViewInit {
  @Input() disabled: boolean = false;
  @Input() horizontalAlignment: 'left' | 'center' | 'right' = 'right';

  private _isFabSheetOpen: boolean = false;
  @HostBinding('class.is-open')
  get isFabSheetOpen() {
    return this._isFabSheetOpen;
  }

  @ContentChild(ActionSheetComponent, { static: false }) actionSheet: ActionSheetComponent;

  @ViewChild(IonFabButton, { static: true, read: ElementRef })
  ionFabButton: ElementRef<HTMLElement>;

  @ViewChild(IonFab, { static: true })
  ionFab: IonFab;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterContentInit(): void {
    if (this.actionSheet) {
      this.actionSheet.hideCancel = true;
    }
  }

  ngAfterViewInit(): void {
    this.renderer.removeClass(this.document.body, 'backdrop-no-scroll');
  }

  hideActions() {
    this.ionFab.close().then(() => this.fabSheetStateChanged(false));
  }

  onFabButtonClick() {
    setTimeout(() => {
      this.fabSheetStateChanged(this.ionFab.activated);
    });
  }

  onFabListClick() {
    this.ionFab.close().then(() => {
      this.fabSheetStateChanged(false);
    });
  }

  fabSheetStateChanged(isOpen: boolean) {
    this._isFabSheetOpen = isOpen;
    if (this.isFabSheetOpen) {
      this.renderer.addClass(this.document.body, 'fab-sheet-active');
      this.renderer.addClass(this.document.body, 'backdrop-no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'fab-sheet-active');
      this.renderer.removeClass(this.document.body, 'backdrop-no-scroll');
    }

    this.changeDetectorRef.detectChanges();
  }
}
