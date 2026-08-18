import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';

@Component({
  selector: 'kirby-x-sidebar-menu-loader',
  templateUrl: './sidebar-menu-loader.component.html',
  styleUrl: './sidebar-menu-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SkeletonLoaderComponent],
})
export class SidebarMenuLoaderComponent {}
