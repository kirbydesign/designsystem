import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';

@Component({
  imports: [SpinnerModule, CommonModule],
  selector: 'kirby-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  @Input() public isLoading = true;
  @Input() public showBackdrop = true;
  @Input() public hideContent = false;
}
