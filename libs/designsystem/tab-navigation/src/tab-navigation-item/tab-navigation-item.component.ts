import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'kirby-tab-navigation-item',
  templateUrl: './tab-navigation-item.component.html',
  styleUrls: ['./tab-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'presentation' },
})
export class TabNavigationItemComponent implements AfterViewInit {
  private _attributesToForward: string[] = ['aria-controls', 'id'];

  @Input()
  label = '';

  @Input()
  truncate = true;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const tabElement: HTMLElement = this.elementRef.nativeElement.querySelector('[role="tab"]');
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      tabElement
    );
  }
}
