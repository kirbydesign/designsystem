import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-x-banner',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {}
