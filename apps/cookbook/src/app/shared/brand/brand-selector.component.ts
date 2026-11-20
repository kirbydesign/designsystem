import { Component, computed, inject } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { Brand } from './brands';
import { BrandService } from './brand.service';

@Component({
  selector: 'cookbook-brand-selector',
  template: `
    <kirby-dropdown
      size="sm"
      popout="left"
      aria-label="Brand theme"
      [items]="brandService.brands"
      [selectedIndex]="selectedIndex()"
      (change)="onChange($event)"
    ></kirby-dropdown>
  `,
  imports: [DropdownComponent],
})
export class BrandSelectorComponent {
  protected brandService = inject(BrandService);
  protected selectedIndex = computed(() =>
    this.brandService.brands.indexOf(this.brandService.brand())
  );

  onChange(brand: Brand) {
    this.brandService.setBrand(brand);
  }
}
