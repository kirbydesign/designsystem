import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonCheckbox, IonicModule } from '@ionic/angular';
import { IonicElementPartHelper } from '@kirbydesign/designsystem/helpers';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [IonicElementPartHelper],
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements AfterViewInit {
  @ViewChild(IonCheckbox, { read: ElementRef, static: true })
  private ionCheckboxElement?: ElementRef<HTMLIonCheckboxElement>;

  @Input() checked: boolean = false;
  @Input() attentionLevel: '1' | '2' = '2';

  @HostBinding('class.has-label')
  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size: 'xs' | 'sm' | 'md' = 'md';

  @HostBinding('class.error')
  @Input()
  hasError: boolean = false;

  @Input() disabled = false;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.attention-level1') get isAttentionLevel1() {
    return this.attentionLevel === '1';
  }
  @HostBinding('class.attention-level2') get isAttentionLevel2() {
    return this.attentionLevel === '2';
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(private ionicElementPartHelper: IonicElementPartHelper) {}

  ngAfterViewInit(): void {
    this.ionicElementPartHelper.setPart('label', this.ionCheckboxElement, '.checkbox-wrapper');
    this.ionicElementPartHelper.setPart(
      'label-text-wrapper',
      this.ionCheckboxElement,
      '.label-text-wrapper'
    );
  }

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }
}
