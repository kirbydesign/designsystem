import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonCheckbox, IonicModule } from '@ionic/angular';
import { IonicElementPartService } from '@kirbydesign/designsystem/helpers';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [IonicElementPartService],
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit {
  @ViewChild(IonCheckbox, { read: ElementRef, static: true })
  private ionCheckboxElement?: ElementRef<HTMLIonCheckboxElement>;

  @Input() checked: boolean = false;
  @Input() attentionLevel: '1' | '2' = '2';

  @HostBinding('class.has-label')
  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size?: 'xs' | 'sm' | 'md';

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

  constructor(private ionicElementPartService: IonicElementPartService) {}

  ngOnInit(): void {
    this.ionicElementPartService.setPart(this.ionCheckboxElement, '.checkbox-wrapper', 'label');
  }

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }
}
