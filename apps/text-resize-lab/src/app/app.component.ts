import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';

import { AppComponent as KirbyAppComponent } from '@kirbydesign/designsystem-repro/kirby-app';
import { ButtonComponent } from '@kirbydesign/designsystem-repro/button';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem-repro/form-field';
import { IconComponent } from '@kirbydesign/designsystem-repro/icon';
import { ModalController, ModalFooterComponent } from '@kirbydesign/designsystem-repro/modal';
import { PageModule } from '@kirbydesign/designsystem-repro/page';
import kirbyPackage from '@kirbydesign/designsystem-repro/package.json';

@Component({
  selector: 'lab-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KirbyAppComponent, ButtonComponent, PageModule],
  providers: [ModalController],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  readonly kirbyVersion = kirbyPackage.version;

  private debugEl?: HTMLElement;
  private intervalId?: number;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    if (Capacitor.getPlatform() !== 'ios') return;
    // Poll the buffer the (patched) Kirby modal writes to and render it on screen.
    this.intervalId = window.setInterval(() => this.renderDebug(), 250);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.debugEl?.remove();
  }

  showModal(): void {
    this.modalController.showModal({
      component: ModalContentComponent,
      flavor: 'drawer',
      size: 'medium',
    });
  }

  private renderDebug(): void {
    const log = (window as unknown as { __kbLog?: string[] }).__kbLog;
    if (!log || !log.length) return;
    if (!this.debugEl) {
      const el = document.createElement('div');
      el.style.cssText =
        'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:rgba(0,0,0,.82);color:#0f0;font:10px/1.35 monospace;padding:calc(env(safe-area-inset-top) + 8px) 6px 8px;white-space:pre-wrap;pointer-events:none';
      document.body.appendChild(el);
      this.debugEl = el;
    }
    this.debugEl.textContent = log.slice(0, 16).join('\n');
  }
}

@Component({
  selector: 'lab-modal-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ButtonComponent,
    FormFieldModule,
    InputComponent,
    IconComponent,
    ModalFooterComponent,
    PageModule,
  ],
  template: `
    <kirby-page-title>Search</kirby-page-title>

    @for (field of fields; track field.key) {
      <div class="form-field-input-wrapper">
        <kirby-form-field [label]="field.label">
          <kirby-icon name="search" kirby-affix="prefix" />
          <input
            kirby-input
            type="text"
            [placeholder]="field.label"
            [(ngModel)]="field.value"
            [size]="'md'"
          />
        </kirby-form-field>
      </div>
    }

    <kirby-modal-footer [snapToKeyboard]="true">
      <button kirby-button (click)="search()">Search</button>
    </kirby-modal-footer>
  `,
})
export class ModalContentComponent {
  fields = [
    { key: 'f1', label: 'Text filter 1', value: '' },
    { key: 'f2', label: 'Text filter 2', value: '' },
    { key: 'f3', label: 'Text filter 3', value: '' },
    { key: 'f4', label: 'Text filter 4', value: '' },
    { key: 'f5', label: 'Text filter 5', value: '' },
    { key: 'f6', label: 'Text filter 6', value: '' },
  ];

  search(): void {}
}
