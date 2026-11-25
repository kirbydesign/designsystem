import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { BrandService } from './brand.service';

@Component({
  selector: 'cookbook-brand-selector',
  template: `
    <kirby-menu placement="bottom-end">
      <button
        kirby-button
        type="button"
        attentionLevel="2"
        aria-expanded="false"
        [attr.aria-label]="'Brand theme: ' + brandService.brand().text"
        [title]="'Brand theme: ' + brandService.brand().text"
      >
        <kirby-icon [name]="brandService.brand().icon"></kirby-icon>
      </button>
      @for (brand of brandService.brands; track brand.id) {
        <kirby-item
          [selected]="brand === brandService.brand()"
          (click)="brandService.setBrand(brand)"
        >
          <kirby-icon [name]="brand.icon" slot="start"></kirby-icon>
          <p class="kirby-item-title">{{ brand.text }}</p>
        </kirby-item>
      }
    </kirby-menu>
  `,
  imports: [MenuComponent, ButtonComponent, IconComponent, ItemComponent],
})
export class BrandSelectorComponent {
  protected brandService = inject(BrandService);
}
