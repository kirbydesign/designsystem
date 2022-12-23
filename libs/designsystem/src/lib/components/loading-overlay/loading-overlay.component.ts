import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpinnerModule } from '../spinner';

@Component({
  standalone: true,
  imports: [SpinnerModule],
  selector: 'kirby-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  @Input() public isLoading = true;
  @Input() public showBackdrop = true;
}
