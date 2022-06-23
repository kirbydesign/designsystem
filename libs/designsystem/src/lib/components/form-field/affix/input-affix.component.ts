import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  template: `
    <span #wrapperEl [class]="type + ' affix' + (tmpl ? '' : ' default')">
      <ng-container
        [ngTemplateOutlet]="tmpl || default"
        [ngTemplateOutletContext]="ctx"
      ></ng-container>
      <ng-template #default>
        {{ text }}
      </ng-template>
    </span>
  `,
  styleUrls: ['./input-affix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAffixComponent {
  @Input() text: string = '';
  @Input() type: 'prefix' | 'suffix' = 'suffix';
  @Input() tmpl: TemplateRef<any> | null | undefined;
  @Input() ctx: object = {};
  @ViewChild('wrapperEl') wrapperEl!: ElementRef;
}
