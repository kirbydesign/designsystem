import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@kirbydesign/designsystem/card';

@Component({
  selector: 'kirby-x-banner',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() title: string | undefined;
}
